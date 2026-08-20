import { useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { decodeJwtPayload, readClaim } from '../services/auth/jwt';

interface UsePermissionsReturn {
  permissions: string[];
  isRoot: boolean;
  /**
   * Assinatura da empresa em pendencia: o usuario entra, mas a API responde 402 em tudo que nao
   * for a tela de pagamento. Serve para o app esconder o resto em vez de deixar o cliente
   * esbarrar em erro atras de erro.
   */
  isSubscriptionBlocked: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

export function usePermissions(): UsePermissionsReturn {
  const { accessToken } = useAuth();

  const { permissions, isRoot, isSubscriptionBlocked } = useMemo(() => {
    if (!accessToken) {
      return { permissions: [], isRoot: false, isSubscriptionBlocked: false };
    }

    const payload = decodeJwtPayload(accessToken);

    return {
      permissions: readClaim(payload, 'permission'),
      isRoot: readClaim(payload, 'root').includes('true'),
      isSubscriptionBlocked: readClaim(payload, 'subscription_blocked').includes('true'),
    };
  }, [accessToken]);

  // As tres funcoes abaixo precisam de identidade estavel. Sem `useCallback` elas eram recriadas a
  // cada render, e consumidor que colocasse qualquer uma em array de dependencia de `useEffect`
  // entrava em laco infinito — com o sintoma aparecendo na aplicacao, nao aqui.
  const hasPermission = useCallback(
    (permission: string): boolean => isRoot || permissions.includes(permission),
    [isRoot, permissions]
  );

  const hasAnyPermission = useCallback(
    (required: string[]): boolean => isRoot || required.some((item) => permissions.includes(item)),
    [isRoot, permissions]
  );

  const hasAllPermissions = useCallback(
    (required: string[]): boolean => isRoot || required.every((item) => permissions.includes(item)),
    [isRoot, permissions]
  );

  return {
    permissions,
    isRoot,
    isSubscriptionBlocked,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
}
