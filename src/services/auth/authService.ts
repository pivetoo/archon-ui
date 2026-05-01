import axios from "axios"
import { httpClient, getIdentityManagementURL, getRequestLanguage } from "../http/client"
import type { IdentifyResult, LoginCredentials, RefreshTokenResponse, ActiveSession, OidcTokenRequest, OidcTokenResponse } from "../../types/auth"

const OIDC_CLIENT_ID_KEY = "@Archon:oidcClientId"

export class AuthService {
  static async identify(credentials: LoginCredentials): Promise<IdentifyResult | null> {
    const returnUrl = new URLSearchParams(window.location.search).get("returnUrl")
    const response = await httpClient.post<IdentifyResult>("/auth/Identify", {
      username: credentials.username,
      password: credentials.password,
      returnUrl: returnUrl ?? undefined,
    })

    return response.data ?? null
  }

  static logout(): void {
    localStorage.removeItem("@Archon:accessToken")
    localStorage.removeItem("@Archon:refreshToken")
    localStorage.removeItem("@Archon:oidcClientId")
    localStorage.removeItem("@Archon:user")
    localStorage.removeItem("@Archon:contract")
  }

  static isAuthenticated(): boolean {
    const accessToken = localStorage.getItem("@Archon:accessToken")
    const refreshToken = localStorage.getItem("@Archon:refreshToken")

    return !!accessToken && !!refreshToken && !this.isTokenExpiringSoon(accessToken, 0)
  }

  static getCurrentUser(): any | null {
    const userStr = localStorage.getItem("@Archon:user")
    return userStr ? JSON.parse(userStr) : null
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("@Archon:accessToken")
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("@Archon:refreshToken")
  }

  static async logoutFromServer(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      const identityManagementUrl = getIdentityManagementURL()
      const oidcClientId = localStorage.getItem(OIDC_CLIENT_ID_KEY) || import.meta.env.VITE_OIDC_CLIENT_ID

      if (refreshToken && identityManagementUrl && oidcClientId) {
        const form = new URLSearchParams()
        form.set("token", refreshToken)
        form.set("token_type_hint", "refresh_token")
        form.set("client_id", oidcClientId)

        await axios.post(
          `${identityManagementUrl.replace(/\/+$/, "")}/connect/revocation`,
          form,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept-Language": getRequestLanguage(),
            },
          }
        )
      }
    } finally {
      this.logout()
    }
  }

  static async logoutAllDevices(): Promise<void> {
    await this.logoutFromServer()
  }

  static async refreshAccessToken(): Promise<RefreshTokenResponse | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error("Refresh token não encontrado")
    }

    try {
      const identityManagementUrl = getIdentityManagementURL()
      const oidcClientId = localStorage.getItem(OIDC_CLIENT_ID_KEY) || import.meta.env.VITE_OIDC_CLIENT_ID
      if (!identityManagementUrl) {
        throw new Error("Identity Management URL não configurada")
      }

      if (!oidcClientId) {
        throw new Error("OIDC client_id não configurado")
      }

      const form = new URLSearchParams()
      form.set("grant_type", "refresh_token")
      form.set("client_id", oidcClientId)
      form.set("refresh_token", refreshToken)

      const response = await axios.post<unknown>(
        `${identityManagementUrl.replace(/\/+$/, "")}/connect/token`,
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": getRequestLanguage(),
          },
        }
      )

      const rawData = response.data
      const oidcTokenData = rawData as OidcTokenResponse | null
      if (!oidcTokenData?.access_token || !oidcTokenData.refresh_token) {
        throw new Error("Refresh token response is empty.")
      }

      const tokenData: RefreshTokenResponse = {
        accessToken: oidcTokenData.access_token,
        refreshToken: oidcTokenData.refresh_token,
        tokenType: oidcTokenData.token_type,
        expiresIn: oidcTokenData.expires_in,
      }

      localStorage.setItem("@Archon:accessToken", tokenData.accessToken)
      localStorage.setItem("@Archon:refreshToken", tokenData.refreshToken)

      return tokenData
    } catch (error) {
      this.logout()
      throw error
    }
  }

  static async exchangeAuthorizationCode(request: OidcTokenRequest): Promise<OidcTokenResponse> {
    const form = new URLSearchParams()
    form.set("grant_type", "authorization_code")
    form.set("client_id", request.clientId)
    form.set("code", request.code)
    form.set("redirect_uri", request.redirectUri)
    form.set("code_verifier", request.codeVerifier)

    const response = await axios.post<OidcTokenResponse>(
      `${request.identityManagementUrl.replace(/\/+$/, "")}/connect/token`,
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Language": getRequestLanguage(),
        },
      }
    )

    return response.data
  }

  static async getActiveSessions(): Promise<ActiveSession[]> {
    return []
  }

  static isTokenExpiringSoon(token: string, minutesBeforeExpiry: number = 5): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const exp = payload.exp * 1000
      const now = Date.now()
      const timeUntilExpiry = exp - now
      const minutesUntilExpiry = timeUntilExpiry / (1000 * 60)

      return minutesUntilExpiry <= minutesBeforeExpiry
    } catch {
      return true
    }
  }

  static async ensureValidToken(): Promise<boolean> {
    const accessToken = this.getAccessToken()
    if (!accessToken) {
      return false
    }

    if (this.isTokenExpiringSoon(accessToken)) {
      try {
        await this.refreshAccessToken()
        return true
      } catch {
        return false
      }
    }

    return true
  }
}
