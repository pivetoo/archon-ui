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

export const useOptionalAuth = () => {
  return React.useContext(AuthContext)
}

interface AuthProviderProps {
  children: React.ReactNode
  onLogout?: () => void
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onLogout }) => {
  const [user, setUser] = React.useState<User | null>(() => {
    const storedUser = localStorage.getItem("@Archon:user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [contract, setContract] = React.useState<ContractType | null>(() => {
    const storedContract = localStorage.getItem("@Archon:contract")
    return storedContract ? JSON.parse(storedContract) : null
  })

  const [accessToken, setAccessToken] = React.useState<string | null>(() => {
    return localStorage.getItem("@Archon:accessToken")
  })

  const [refreshToken, setRefreshToken] = React.useState<string | null>(() => {
    return localStorage.getItem("@Archon:refreshToken")
  })

  const login = React.useCallback((data: LoginResult) => {
    setUser(data.user)
    setContract(data.contract)
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)

    localStorage.setItem("@Archon:user", JSON.stringify(data.user))
    localStorage.setItem("@Archon:contract", JSON.stringify(data.contract))
    localStorage.setItem("@Archon:accessToken", data.accessToken)
    localStorage.setItem("@Archon:refreshToken", data.refreshToken)
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    setContract(null)
    setAccessToken(null)
    setRefreshToken(null)

    localStorage.removeItem("@Archon:user")
    localStorage.removeItem("@Archon:contract")
    localStorage.removeItem("@Archon:accessToken")
    localStorage.removeItem("@Archon:refreshToken")

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
        localStorage.setItem("@Archon:accessToken", tokenData.accessToken)
        localStorage.setItem("@Archon:refreshToken", tokenData.refreshToken)
      }
    } catch (error) {
      logout()
    }
  }, [logout])

  const getActiveSessions = React.useCallback(async (): Promise<ActiveSession[]> => {
    return []
  }, [])

  const updateUser = React.useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        localStorage.setItem("@Archon:user", JSON.stringify(updatedUser))
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
