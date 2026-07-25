/**
 * Decodificação de JWT no cliente.
 *
 * Existiam três implementações independentes disso — `authService.isTokenExpiringSoon` (com `atob`
 * cru), `usePermissions.decodeJwtPayload` e `Callback.parseJwt` — divergindo no tratamento de UTF-8
 * e no valor devolvido em erro. Claim com acento (nome de usuário, razão social) saía corrompida em
 * uma delas.
 *
 * Isto NÃO valida assinatura: serve só para ler claim de um token que o servidor já emitiu. Decisão
 * de autorização real acontece no backend.
 */

export interface JwtPayload {
  exp?: number
  [claim: string]: unknown
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadSegment = token.split(".")[1]

    if (!payloadSegment) {
      return null
    }

    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")

    // `atob` devolve bytes latin1. Sem esta conversão, caractere acentuado em claim vem corrompido.
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((character) => "%" + ("00" + character.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )

    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

/**
 * Token inválido ou ilegível conta como expirando: força a renovação em vez de seguir com credencial
 * que ninguém consegue interpretar.
 */
export function isTokenExpiringSoon(token: string, minutesBeforeExpiry: number = 5): boolean {
  const payload = decodeJwtPayload(token)

  if (!payload || typeof payload.exp !== "number") {
    return true
  }

  const minutesUntilExpiry = (payload.exp * 1000 - Date.now()) / (1000 * 60)

  return minutesUntilExpiry <= minutesBeforeExpiry
}

/** Lê uma claim que o emissor pode mandar como valor único ou como array. */
export function readClaim(payload: JwtPayload | null, claim: string): string[] {
  const value = payload?.[claim]

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string")
  }

  return typeof value === "string" ? [value] : []
}
