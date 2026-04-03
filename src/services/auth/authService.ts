import axios from "axios"
import { httpClient, getIdentityProviderURL } from "../http/client"
import type { IdentifyResult, LoginResult, LoginCredentials, ContractLoginRequest, RefreshTokenResponse, ActiveSession } from "../../types/auth"

export class AuthService {
  static async identify(credentials: LoginCredentials): Promise<IdentifyResult | LoginResult | null> {
    const response = await httpClient.post<IdentifyResult | LoginResult>("/auth/IdentifyUser", {
      username: credentials.username,
      password: credentials.password,
    })

    return response.data
  }

  static async loginWithContract(request: ContractLoginRequest): Promise<LoginResult> {
    const response = await httpClient.post<LoginResult>("/auth/LoginWithContract", request)

    const loginData = response.data
    const { accessToken, refreshToken, user, contract } = loginData

    localStorage.setItem("@IdentityProvider:accessToken", accessToken)
    localStorage.setItem("@IdentityProvider:refreshToken", refreshToken)
    localStorage.setItem("@IdentityProvider:user", JSON.stringify(user))
    localStorage.setItem("@IdentityProvider:contract", JSON.stringify(contract))

    return loginData
  }

  static async login(credentials: LoginCredentials) {
    const response = await httpClient.post<LoginResult>("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    })

    const loginData = response.data
    const { accessToken, refreshToken, user } = loginData

    localStorage.setItem("@IdentityProvider:accessToken", accessToken)
    localStorage.setItem("@IdentityProvider:refreshToken", refreshToken)
    localStorage.setItem("@IdentityProvider:user", JSON.stringify(user))

    return loginData
  }

  static logout(): void {
    localStorage.removeItem("@IdentityProvider:accessToken")
    localStorage.removeItem("@IdentityProvider:refreshToken")
    localStorage.removeItem("@IdentityProvider:user")
    localStorage.removeItem("@IdentityProvider:contract")
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("@IdentityProvider:accessToken")
    return !!token
  }

  static getCurrentUser(): any | null {
    const userStr = localStorage.getItem("@IdentityProvider:user")
    return userStr ? JSON.parse(userStr) : null
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("@IdentityProvider:accessToken")
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("@IdentityProvider:refreshToken")
  }

  static async logoutFromServer(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      if (refreshToken) {
        await axios.post(
          `${getIdentityProviderURL()}/auth/Logout`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        )
      }
    } finally {
      this.logout()
    }
  }

  static async logoutAllDevices(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      if (refreshToken) {
        await axios.post(
          `${getIdentityProviderURL()}/auth/LogoutAllDevices`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        )
      }
    } finally {
      this.logout()
    }
  }

  static async refreshAccessToken(): Promise<RefreshTokenResponse | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error("Refresh token não encontrado")
    }

    try {
      const response = await httpClient.post<RefreshTokenResponse>("/auth/RefreshToken", {
        refreshToken,
      })

      const tokenData = response.data
      const { accessToken, refreshToken: newRefreshToken } = tokenData

      localStorage.setItem("@IdentityProvider:accessToken", accessToken)
      localStorage.setItem("@IdentityProvider:refreshToken", newRefreshToken)

      return tokenData
    } catch (error) {
      this.logout()
      throw error
    }
  }

  static async revokeRefreshToken(refreshToken?: string): Promise<void> {
    const tokenToRevoke = refreshToken || this.getRefreshToken()
    if (!tokenToRevoke) {
      return
    }

    await httpClient.post("/auth/RevokeRefreshToken", {
      refreshToken: tokenToRevoke,
    })
  }

  static async getActiveSessions(): Promise<ActiveSession[]> {
    const response = await httpClient.get<ActiveSession[]>("/auth/GetActiveSessions")
    return response.data
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
