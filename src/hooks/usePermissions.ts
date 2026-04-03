import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UsePermissionsReturn {
  permissions: string[];
  isSuperUser: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

export function usePermissions(): UsePermissionsReturn {
  const { accessToken } = useAuth();

  const { permissions, isSuperUser } = useMemo(() => {
    if (!accessToken) {
      return { permissions: [], isSuperUser: false };
    }

    const payload = decodeJwtPayload(accessToken);

    let perms: string[] = [];
    if (payload.permission) {
      perms = Array.isArray(payload.permission)
        ? payload.permission as string[]
        : [payload.permission as string];
    }

    return {
      permissions: perms,
      isSuperUser: payload.super_user === 'true'
    };
  }, [accessToken]);

  const hasPermission = (permission: string): boolean => {
    if (isSuperUser) return true;
    return permissions.includes(permission);
  };

  const hasAnyPermission = (perms: string[]): boolean => {
    if (isSuperUser) return true;
    return perms.some(p => permissions.includes(p));
  };

  const hasAllPermissions = (perms: string[]): boolean => {
    if (isSuperUser) return true;
    return perms.every(p => permissions.includes(p));
  };

  return {
    permissions,
    isSuperUser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
}
