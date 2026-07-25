/**
 * Chaves do `localStorage`/`sessionStorage` usadas pelo Archon UI.
 *
 * Existem aqui porque estavam repetidas como literal em sete arquivos (`AuthContext`, `authService`,
 * `client`, `return-url`, `profileService`, `I18nProvider`, `Callback`). Um typo em qualquer um deles
 * não quebra o build nem o lint: o valor simplesmente não é encontrado, e o sintoma aparece como
 * "usuário deslogado sozinho" ou "idioma não persiste".
 */

const PREFIX = "@Archon:"

export const ACCESS_TOKEN_KEY = `${PREFIX}accessToken`
export const REFRESH_TOKEN_KEY = `${PREFIX}refreshToken`
export const OIDC_CLIENT_ID_KEY = `${PREFIX}oidcClientId`
export const USER_KEY = `${PREFIX}user`
export const CONTRACT_KEY = `${PREFIX}contract`
export const LANGUAGE_KEY = `${PREFIX}language`

/** Chaves do fluxo OIDC. Vivem em `sessionStorage` e são consumidas uma única vez no callback. */
export const OIDC_STATE_KEY = `${PREFIX}oidc:state`
export const OIDC_NONCE_KEY = `${PREFIX}oidc:nonce`
export const OIDC_CODE_VERIFIER_KEY = `${PREFIX}oidc:codeVerifier`
export const OIDC_REDIRECT_URI_KEY = `${PREFIX}oidc:redirectUri`

/** Chaves da sessão de autenticação, limpas juntas no logout. */
export const AUTH_STORAGE_KEYS = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, OIDC_CLIENT_ID_KEY, USER_KEY, CONTRACT_KEY] as const

/**
 * `JSON.parse` que não derruba a aplicação. Storage pode conter lixo — versão antiga do app, extensão
 * de navegador, edição manual. Antes disso um valor corrompido estourava no inicializador de estado
 * do `AuthProvider`, ou seja, no boot, sem caminho de recuperação além de limpar o storage na mão.
 */
export function readJson<T>(storage: Storage, key: string): T | null {
  const raw = storage.getItem(key)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    storage.removeItem(key)
    return null
  }
}
