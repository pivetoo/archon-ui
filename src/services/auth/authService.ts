import axios from "axios"
import { httpClient, getIdentityManagementURL, getRequestLanguage, refreshAccessToken as refreshSharedAccessToken, clearAuthStorage } from "../http/client"
import { ACCESS_TOKEN_KEY, OIDC_CLIENT_ID_KEY, REFRESH_TOKEN_KEY, USER_KEY, readJson } from "../storage/keys"
import { isTokenExpiringSoon as isJwtExpiringSoon } from "./jwt"
import type { IdentifyResult, LoginCredentials, RefreshTokenResponse, OidcTokenRequest, OidcTokenResponse, User } from "../../types/auth"

export class AuthService {
  static async identify(credentials: LoginCredentials): Promise<IdentifyResult | null> {
    const response = await httpClient.post<IdentifyResult>("/auth/Identify", {
      username: credentials.username,
      password: credentials.password,
      authorizeUrl: credentials.authorizeUrl,
    })

    return response.data ?? null
  }

  static logout(): void {
    clearAuthStorage()
  }

  static isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    return !!accessToken && !!refreshToken && !this.isTokenExpiringSoon(accessToken, 0)
  }

  static getCurrentUser(): User | null {
    return readJson<User>(localStorage, USER_KEY)
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
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

  /**
   * Delega para o ponto ÚNICO de renovação do `httpClient`, que tem single-flight.
   *
   * Antes havia aqui uma segunda implementação, sem essa proteção. Como o IdentityManagement
   * **rotaciona** refresh token (revoga o apresentado e emite outro), duas renovações concorrentes
   * faziam a segunda apresentar um token já revogado — e o `catch` daqui deslogava o usuário no meio
   * do uso, sem erro que explicasse.
   */
  static async refreshAccessToken(): Promise<RefreshTokenResponse | null> {
    return await refreshSharedAccessToken()
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

  static isTokenExpiringSoon(token: string, minutesBeforeExpiry: number = 5): boolean {
    return isJwtExpiringSoon(token, minutesBeforeExpiry)
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
