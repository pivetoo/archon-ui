export const normalizeExternalUrl = (value: string) => {
  const parsedUrl = new URL(value)
  const normalizedPath = parsedUrl.pathname.replace(/\/+$/, "") || "/"
  return `${parsedUrl.origin}${normalizedPath}`
}

export const buildIdentityManagementLoginUrl = ({
  identityManagementUrl,
  callbackPath = "/callback",
  currentOrigin,
}: {
  identityManagementUrl?: string
  callbackPath?: string
  currentOrigin?: string
}) => {
  if (!identityManagementUrl || !currentOrigin) {
    return identityManagementUrl
  }

  const callbackUrl = new URL(callbackPath, currentOrigin)
  const loginUrl = new URL(identityManagementUrl)
  loginUrl.searchParams.set("returnUrl", callbackUrl.toString())

  return loginUrl.toString()
}

export const getReturnUrl = (search: string, currentOrigin?: string) => {
  if (!currentOrigin) {
    return undefined
  }

  const rawReturnUrl = new URLSearchParams(search).get("returnUrl")
  if (!rawReturnUrl) {
    return undefined
  }

  try {
    const parsedUrl = new URL(rawReturnUrl)
    return parsedUrl.origin === currentOrigin ? undefined : parsedUrl.toString()
  } catch {
    return undefined
  }
}

export const matchesReturnUrl = (returnUrl?: string, redirectUris?: string) => {
  if (!returnUrl || !redirectUris) {
    return false
  }

  const normalizedReturnUrl = normalizeExternalUrl(returnUrl)

  return redirectUris
    .split(",")
    .map((uri) => uri.trim())
    .filter(Boolean)
    .flatMap((uri) => {
      const normalizedUri = uri.replace(/\/+$/, "")
      return [normalizedUri, `${normalizedUri}/callback`]
    })
    .some((uri) => {
      try {
        return normalizeExternalUrl(uri) === normalizedReturnUrl
      } catch {
        return false
      }
    })
}

export const buildCallbackRedirectUrl = (returnUrl: string, accessToken: string, refreshToken: string) => {
  const callbackUrl = new URL(returnUrl)
  callbackUrl.searchParams.set("accessToken", accessToken)
  callbackUrl.searchParams.set("refreshToken", refreshToken)
  return callbackUrl.toString()
}
