export interface IdentifyResult {
  authenticationStep: 'contractSelection'
  userId: number
  userName: string
  userEmail: string
  temporaryToken: string
  availableContracts: ContractType[]
}

export interface ContractType {
  contractId: number
  systemApplicationName: string
  companyName: string
  redirectUris: string
  roleName?: string
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
  authenticationStep: 'completed'
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
  userId: number
  contractId: number
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
  logoutAllDevices: () => Promise<void>
  refreshAccessToken: () => Promise<void>
  getActiveSessions: () => Promise<ActiveSession[]>
  updateUser: (userData: Partial<User>) => void
}
