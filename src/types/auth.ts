export interface IdentifyResult {
  authenticationStep: 'contractSelection'
  userId: number
  userName: string
  userEmail: string
  authorizationSessionToken: string
  availableContracts: ContractType[]
}

export interface ContractType {
  contractId: number
  systemApplicationName: string
  companyName: string
  roleName?: string
  portalUrl?: string
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
  authorizeUrl?: string
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

export interface OidcTokenResponse {
  access_token: string
  id_token?: string
  refresh_token?: string
  token_type: string
  expires_in: number
  scope?: string
}

export interface OidcTokenRequest {
  identityManagementUrl: string
  clientId: string
  code: string
  redirectUri: string
  codeVerifier: string
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
  refreshAccessToken: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

// `getActiveSessions` e `logoutAllDevices` foram removidos daqui. O primeiro devolvia `[]` fixo — uma
// API que responde com sucesso e mente, fazendo a tela mostrar "nenhuma sessao" para quem tem varias.
// O segundo so revogava o refresh token da sessao ATUAL, apesar do nome. Nenhum dos dois era
// consumido pelas aplicacoes. Voltam quando o IdentityManagement expuser endpoint de sessao: a tabela
// `loginsessions` ja existe la, o controller nao.
