import React, { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { buildIdentityManagementAuthorizeUrl } from './return-url'

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
      const targetUrl = oidcClientId
        ? await buildIdentityManagementAuthorizeUrl({
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
