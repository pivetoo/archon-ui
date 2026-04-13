import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { buildIdentityManagementLoginUrl } from './return-url'

export interface ProtectedRouteProps {
  children: React.ReactElement
  isAuthenticated: boolean
  redirectTo?: string
  externalRedirect?: boolean
  preserveExternalReturn?: boolean
  callbackPath?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/',
  externalRedirect = false,
  preserveExternalReturn = false,
  callbackPath = '/callback',
}) => {
  const location = useLocation()

  if (!isAuthenticated) {
    if (externalRedirect && redirectTo) {
      const targetUrl = preserveExternalReturn
        ? buildIdentityManagementLoginUrl({
            identityManagementUrl: redirectTo,
            callbackPath,
            currentOrigin: typeof window === 'undefined' ? undefined : window.location.origin,
          }) ?? redirectTo
        : redirectTo

      window.location.href = targetUrl
      return null
    }

    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}
