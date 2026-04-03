import * as React from "react"
import type { AuthContextData, LoginResult, User, ContractType, ActiveSession } from "../types/auth"
import { AuthService } from "../services/auth/authService"

const AuthContext = React.createContext<AuthContextData | null>(null)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
  onLogout?: () => void
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onLogout }) => {
  const [user, setUser] = React.useState<User | null>(() => {
    const storedUser = localStorage.getItem("@IdentityProvider:user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [contract, setContract] = React.useState<ContractType | null>(() => {
    const storedContract = localStorage.getItem("@IdentityProvider:contract")
    return storedContract ? JSON.parse(storedContract) : null
  })

  const [accessToken, setAccessToken] = React.useState<string | null>(() => {
    return localStorage.getItem("@IdentityProvider:accessToken")
  })

  const [refreshToken, setRefreshToken] = React.useState<string | null>(() => {
    return localStorage.getItem("@IdentityProvider:refreshToken")
  })

  const login = React.useCallback((data: LoginResult) => {
    setUser(data.user)
    setContract(data.contract)
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)

    const { criadoEm, ultimaAlteracao, lastLoginAt, ...userToStore } = data.user as User & { criadoEm?: string; ultimaAlteracao?: string }
    localStorage.setItem("@IdentityProvider:user", JSON.stringify(userToStore))
    localStorage.setItem("@IdentityProvider:contract", JSON.stringify(data.contract))
    localStorage.setItem("@IdentityProvider:accessToken", data.accessToken)
    localStorage.setItem("@IdentityProvider:refreshToken", data.refreshToken)
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    setContract(null)
    setAccessToken(null)
    setRefreshToken(null)

    localStorage.removeItem("@IdentityProvider:user")
    localStorage.removeItem("@IdentityProvider:contract")
    localStorage.removeItem("@IdentityProvider:accessToken")
    localStorage.removeItem("@IdentityProvider:refreshToken")

    onLogout?.()
  }, [onLogout])

  const logoutAllDevices = React.useCallback(async () => {
    await AuthService.logoutAllDevices()
    logout()
  }, [logout])

  const refreshAccessToken = React.useCallback(async () => {
    try {
      const tokenData = await AuthService.refreshAccessToken()
      if (tokenData) {
        setAccessToken(tokenData.accessToken)
        setRefreshToken(tokenData.refreshToken)
        localStorage.setItem("@IdentityProvider:accessToken", tokenData.accessToken)
        localStorage.setItem("@IdentityProvider:refreshToken", tokenData.refreshToken)
      }
    } catch (error) {
      logout()
    }
  }, [logout])

  const getActiveSessions = React.useCallback(async (): Promise<ActiveSession[]> => {
    try {
      return await AuthService.getActiveSessions()
    } catch (error) {
      return []
    }
  }, [])

  const updateUser = React.useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        const { criadoEm, ultimaAlteracao, lastLoginAt, ...userToStore } = updatedUser as User & { criadoEm?: string; ultimaAlteracao?: string }
        localStorage.setItem("@IdentityProvider:user", JSON.stringify(userToStore))
      }
    },
    [user]
  )

  const isAuthenticated = !!user && !!accessToken

  const value = React.useMemo(
    () => ({
      user,
      contract,
      accessToken,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      logoutAllDevices,
      refreshAccessToken,
      getActiveSessions,
      updateUser,
    }),
    [
      user,
      contract,
      accessToken,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      logoutAllDevices,
      refreshAccessToken,
      getActiveSessions,
      updateUser,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
