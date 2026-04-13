import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UsePermissionsReturn {
  permissions: string[];
  isRoot: boolean;
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

  const { permissions, isRoot } = useMemo(() => {
    if (!accessToken) {
      return { permissions: [], isRoot: false };
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
      isRoot: payload.root === 'true'
    };
  }, [accessToken]);

  const hasPermission = (permission: string): boolean => {
    if (isRoot) return true;
    return permissions.includes(permission);
  };

  const hasAnyPermission = (perms: string[]): boolean => {
    if (isRoot) return true;
    return perms.some(p => permissions.includes(p));
  };

  const hasAllPermissions = (perms: string[]): boolean => {
    if (isRoot) return true;
    return perms.every(p => permissions.includes(p));
  };

  return {
    permissions,
    isRoot,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
}
