export interface IdentifyResult {
  usuarioId: number
  usuarioName: string
  usuarioEmail: string
  temporaryToken: string
  availableContratos: ContractType[]
}

export interface ContractType {
  contratoId: number
  sistemaName: string
  empresaName: string
  redirectUris: string[]
  perfilName?: string
}

export interface User {
  id: number
  username: string
  email: string
  name: string
  avatarUrl?: string
  isActive?: boolean
  lastLoginAt?: string
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
  tokenType?: string
  expiresIn?: number
  user: User
  contract: ContractType
  redirectUrl?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface ContractLoginRequest {
  usuarioId: number
  contratoId: number
  temporaryToken: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface RevokeRefreshTokenRequest {
  refreshToken: string
}

export interface ActiveSession {
  sessionId: string
  ipAddress: string
  userAgent: string
  createdAt: string
  expiresAt: string
  isActive: boolean
  isCurrent: boolean
}

export interface AuthContextData {
  user: User | null
  contract: ContractType | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (data: LoginResult) => void
  logout: () => void
  logoutAllDevices: () => void
  refreshAccessToken: () => Promise<void>
  getActiveSessions: () => Promise<ActiveSession[]>
  updateUser: (userData: Partial<User>) => void
}
