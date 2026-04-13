import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
  redirectTo?: string;
  externalRedirect?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/',
  externalRedirect = false
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    if (externalRedirect && redirectTo) {
      window.location.href = redirectTo;
      return null;
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
