export const OIDC_STATE_KEY = "@Archon:oidc:state"
export const OIDC_NONCE_KEY = "@Archon:oidc:nonce"
export const OIDC_CODE_VERIFIER_KEY = "@Archon:oidc:codeVerifier"
export const OIDC_REDIRECT_URI_KEY = "@Archon:oidc:redirectUri"

const randomBase64Url = (byteLength: number) => {
  const bytes = new Uint8Array(byteLength)
  crypto.getRandomValues(bytes)
  return base64UrlEncode(bytes)
}

const base64UrlEncode = (bytes: Uint8Array) => {
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

const sha256Base64Url = async (value: string) => {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return base64UrlEncode(new Uint8Array(digest))
}

export const buildIdentityManagementAuthorizeUrl = async ({
  identityManagementUrl,
  clientId,
  callbackPath = "/callback",
  currentOrigin,
  redirectUri,
  scope = "openid profile email offline_access",
  contractId,
}: {
  identityManagementUrl?: string
  clientId: string
  callbackPath?: string
  currentOrigin?: string
  redirectUri?: string
  scope?: string
  contractId?: string | number
}) => {
  if (!identityManagementUrl || !currentOrigin) {
    return identityManagementUrl
  }

  const resolvedRedirectUri = redirectUri ?? new URL(callbackPath, currentOrigin).toString()
  const state = randomBase64Url(32)
  const nonce = randomBase64Url(32)
  const codeVerifier = randomBase64Url(64)
  const codeChallenge = await sha256Base64Url(codeVerifier)

  sessionStorage.setItem(OIDC_STATE_KEY, state)
  sessionStorage.setItem(OIDC_NONCE_KEY, nonce)
  sessionStorage.setItem(OIDC_CODE_VERIFIER_KEY, codeVerifier)
  sessionStorage.setItem(OIDC_REDIRECT_URI_KEY, resolvedRedirectUri)

  const authorizeUrl = new URL("/connect/authorize", identityManagementUrl)
  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("redirect_uri", resolvedRedirectUri)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("scope", scope)
  authorizeUrl.searchParams.set("state", state)
  authorizeUrl.searchParams.set("nonce", nonce)
  authorizeUrl.searchParams.set("code_challenge", codeChallenge)
  authorizeUrl.searchParams.set("code_challenge_method", "S256")
  if (contractId !== undefined && contractId !== null && String(contractId).trim()) {
    authorizeUrl.searchParams.set("contract_id", String(contractId))
  }

  return authorizeUrl.toString()
}

export const buildIdentityManagementLoginUrl = async ({
  identityManagementUrl,
  clientId,
  callbackPath = "/callback",
  currentOrigin,
  redirectUri,
  scope,
  contractId,
}: {
  identityManagementUrl?: string
  clientId: string
  callbackPath?: string
  currentOrigin?: string
  redirectUri?: string
  scope?: string
  contractId?: string | number
}) => {
  const authorizeUrl = await buildIdentityManagementAuthorizeUrl({
    identityManagementUrl,
    clientId,
    callbackPath,
    currentOrigin,
    redirectUri,
    scope,
    contractId,
  })

  if (!identityManagementUrl || !authorizeUrl) {
    return authorizeUrl
  }

  const loginUrl = new URL("/login", identityManagementUrl)
  loginUrl.searchParams.set("returnUrl", authorizeUrl)
  return loginUrl.toString()
}
