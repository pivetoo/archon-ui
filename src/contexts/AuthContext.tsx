import * as React from "react"
import type { AuthContextData, LoginResult, User, ContractType } from "../types/auth"
import { AuthService } from "../services/auth/authService"
import { setAuthFailureHandler, clearAuthStorage } from "../services/http/client"
import { ACCESS_TOKEN_KEY, CONTRACT_KEY, REFRESH_TOKEN_KEY, USER_KEY, readJson } from "../services/storage/keys"

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
  // `readJson` em vez de `JSON.parse` cru: valor corrompido no storage estourava aqui, no
  // inicializador de estado, ou seja, no boot da aplicacao inteira e sem caminho de recuperacao.
  const [user, setUser] = React.useState<User | null>(() => readJson<User>(localStorage, USER_KEY))

  const [contract, setContract] = React.useState<ContractType | null>(() => readJson<ContractType>(localStorage, CONTRACT_KEY))

  const [accessToken, setAccessToken] = React.useState<string | null>(() => localStorage.getItem(ACCESS_TOKEN_KEY))

  const [refreshToken, setRefreshToken] = React.useState<string | null>(() => localStorage.getItem(REFRESH_TOKEN_KEY))

  const login = React.useCallback((data: LoginResult) => {
    setUser(data.user)
    setContract(data.contract)
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)

    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    localStorage.setItem(CONTRACT_KEY, JSON.stringify(data.contract))
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken)
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    setContract(null)
    setAccessToken(null)
    setRefreshToken(null)

    clearAuthStorage()

    onLogout?.()
  }, [onLogout])

  React.useEffect(() => {
    setAuthFailureHandler(logout)

    return () => {
      setAuthFailureHandler(null)
    }
  }, [logout])

  const refreshAccessToken = React.useCallback(async () => {
    try {
      const tokenData = await AuthService.refreshAccessToken()
      if (tokenData) {
        setAccessToken(tokenData.accessToken)
        setRefreshToken(tokenData.refreshToken)
      }
    } catch {
      logout()
    }
  }, [logout])

  const updateUser = React.useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
      }
    },
    [user]
  )

  const isAuthenticated = !!user && !!accessToken && !!refreshToken

  const value = React.useMemo(
    () => ({
      user,
      contract,
      accessToken,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      refreshAccessToken,
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
      refreshAccessToken,
      updateUser,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
