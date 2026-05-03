import React, { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { buildIdentityManagementAuthorizeUrl, buildIdentityManagementLoginUrl } from './return-url'

export interface ProtectedRouteProps {
  children: React.ReactElement
  isAuthenticated: boolean
  redirectTo?: string
  externalRedirect?: boolean
  callbackPath?: string
  oidcClientId?: string
  oidcScope?: string
  oidcRedirectUri?: string
}

const getIdentityLaunch = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash

  if (!hash) {
    return null
  }

  const params = new URLSearchParams(hash)
  const authorizationSessionToken = params.get('authorizationSessionToken')
  const contractId = params.get('contractId')

  if (!authorizationSessionToken || !contractId) {
    return null
  }

  return {
    authorizationSessionToken,
    contractId,
  }
}

const completeIdentityLaunch = async ({
  identityManagementUrl,
  authorizationSessionToken,
  contractId,
  authorizeUrl,
}: {
  identityManagementUrl: string
  authorizationSessionToken: string
  contractId: string
  authorizeUrl: string
}) => {
  const completeAuthorizeUrl = new URL('/api/oidc/complete-authorize', identityManagementUrl)
  const response = await fetch(completeAuthorizeUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authorizationSessionToken,
      contractId: Number(contractId),
      authorizeUrl,
    }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível completar o login pelo Identity Management.')
  }

  const data = await response.json() as { redirectUrl?: string }
  if (!data.redirectUrl) {
    throw new Error('Resposta inválida ao completar o login pelo Identity Management.')
  }

  return data.redirectUrl
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/',
  externalRedirect = false,
  callbackPath = '/callback',
  oidcClientId,
  oidcScope,
  oidcRedirectUri,
}) => {
  const location = useLocation()
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    if (isAuthenticated) {
      hasRedirectedRef.current = false
      return
    }

    if (!externalRedirect || !redirectTo || hasRedirectedRef.current) {
      return
    }

    const redirect = async () => {
      const currentOrigin = typeof window === 'undefined' ? undefined : window.location.origin
      const identityLaunch = getIdentityLaunch()

      if (identityLaunch && oidcClientId && currentOrigin) {
        const authorizeUrl = await buildIdentityManagementAuthorizeUrl({
          identityManagementUrl: redirectTo,
          clientId: oidcClientId,
          callbackPath,
          currentOrigin,
          redirectUri: oidcRedirectUri,
          scope: oidcScope,
          contractId: identityLaunch.contractId,
        })

        if (authorizeUrl) {
          window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`)
          const redirectUrl = await completeIdentityLaunch({
            identityManagementUrl: redirectTo,
            authorizationSessionToken: identityLaunch.authorizationSessionToken,
            contractId: identityLaunch.contractId,
            authorizeUrl,
          })

          hasRedirectedRef.current = true
          window.location.href = redirectUrl
          return
        }
      }

      const targetUrl = oidcClientId
        ? await buildIdentityManagementLoginUrl({
          identityManagementUrl: redirectTo,
          clientId: oidcClientId,
          callbackPath,
          currentOrigin,
          redirectUri: oidcRedirectUri,
          scope: oidcScope,
        })
        : redirectTo

      hasRedirectedRef.current = true
      window.location.href = targetUrl ?? redirectTo
    }

    redirect()
  }, [callbackPath, externalRedirect, isAuthenticated, oidcClientId, oidcRedirectUri, oidcScope, redirectTo])

  if (!isAuthenticated) {
    if (externalRedirect && redirectTo) {
      return null
    }

    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}
