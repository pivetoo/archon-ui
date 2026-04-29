import axios from "axios"
import { httpClient, getIdentityManagementURL, getRequestLanguage } from "../http/client"
import type { IdentifyResult, LoginResult, LoginCredentials, ContractLoginRequest, RefreshTokenResponse, ActiveSession } from "../../types/auth"

export class AuthService {
  static async identify(credentials: LoginCredentials): Promise<IdentifyResult | LoginResult | null> {
    const returnUrl = new URLSearchParams(window.location.search).get("returnUrl")
    const response = await httpClient.post<IdentifyResult | LoginResult>("/auth/Identify", {
      username: credentials.username,
      password: credentials.password,
      returnUrl: returnUrl ?? undefined,
    })

    return response.data ?? null
  }

  static async loginWithContract(request: ContractLoginRequest): Promise<LoginResult> {
    const response = await httpClient.post<LoginResult>("/auth/LoginWithContract", request)

    const loginData = response.data
    if (!loginData) {
      throw new Error("Login response is empty.")
    }

    const { accessToken, refreshToken, user, contract } = loginData

    localStorage.setItem("@Archon:accessToken", accessToken)
    localStorage.setItem("@Archon:refreshToken", refreshToken)
    localStorage.setItem("@Archon:user", JSON.stringify(user))
    localStorage.setItem("@Archon:contract", JSON.stringify(contract))

    return loginData
  }

  static async login(credentials: LoginCredentials) {
    const result = await this.identify(credentials)

    if (!result || result.authenticationStep !== "completed") {
      throw new Error("Login requires contract selection.")
    }

    localStorage.setItem("@Archon:accessToken", result.accessToken)
    localStorage.setItem("@Archon:refreshToken", result.refreshToken)
    localStorage.setItem("@Archon:user", JSON.stringify(result.user))
    localStorage.setItem("@Archon:contract", JSON.stringify(result.contract))

    return result
  }

  static logout(): void {
    localStorage.removeItem("@Archon:accessToken")
    localStorage.removeItem("@Archon:refreshToken")
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

      if (refreshToken && identityManagementUrl) {
        await axios.post(
          `${identityManagementUrl}/auth/Logout`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
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
      if (!identityManagementUrl) {
        throw new Error("Identity Management URL não configurada")
      }

      const response = await axios.post<unknown>(
        `${identityManagementUrl}/auth/RefreshToken`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": getRequestLanguage(),
          },
        }
      )

      const rawData = response.data
      const tokenData: RefreshTokenResponse | null = rawData && typeof rawData === "object" && "data" in rawData
        ? (((rawData as { data?: RefreshTokenResponse }).data) ?? null)
        : (rawData as RefreshTokenResponse)
      if (!tokenData) {
        throw new Error("Refresh token response is empty.")
      }

      const { accessToken, refreshToken: newRefreshToken } = tokenData

      localStorage.setItem("@Archon:accessToken", accessToken)
      localStorage.setItem("@Archon:refreshToken", newRefreshToken)

      return tokenData
    } catch (error) {
      this.logout()
      throw error
    }
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
