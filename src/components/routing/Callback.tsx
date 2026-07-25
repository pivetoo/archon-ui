import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { AuthService } from '../../services/auth/authService';
import { getIdentityManagementURL } from '../../services/http/client';
import { decodeJwtPayload } from '../../services/auth/jwt';
import { OIDC_CLIENT_ID_KEY } from '../../services/storage/keys';
import { OIDC_CODE_VERIFIER_KEY, OIDC_NONCE_KEY, OIDC_REDIRECT_URI_KEY, OIDC_STATE_KEY } from './return-url';

export interface CallbackProps {
  redirectTo?: string;
  identityManagementUrl?: string;
  oidcClientId?: string;
  oidcRedirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/** Le uma claim como texto. O payload do JWT e `unknown` por claim, e o emissor pode mandar array. */
const claimText = (payload: Record<string, unknown> | null, ...claims: string[]): string => {
  for (const claim of claims) {
    const value = payload?.[claim]

    if (Array.isArray(value) && typeof value[0] === 'string') {
      return value[0]
    }

    if (typeof value === 'string' && value.length > 0) {
      return value
    }

    if (typeof value === 'number') {
      return String(value)
    }
  }

  return ''
}

export const Callback: React.FC<CallbackProps> = ({
  redirectTo = '/',
  identityManagementUrl,
  oidcClientId,
  oidcRedirectUri,
  onSuccess,
  onError
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  // Callbacks em ref, e nao no array de dependencia. Consumidor que passe arrow inline
  // (`onSuccess={() => navigate('/')}`) muda a identidade a cada render; o efeito reexecutava, o
  // `state` ja tinha sido consumido do sessionStorage, e a segunda passagem falhava com
  // "OIDC state invalido" -> onError -> redirect para o IdP. Laco de login.
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  // O codigo de autorizacao e de uso unico: processar duas vezes queima o code.
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) {
      return;
    }

    processedRef.current = true;

    const processCallback = async () => {
      try {
        await processOidcCallback();
      } catch (error) {
        onErrorRef.current?.(error as Error);

        const idpUrl = identityManagementUrl || import.meta.env.VITE_IDENTITY_MANAGEMENT_URL;
        if (idpUrl) {
          window.location.href = idpUrl;
        }
      }
    };

    const processOidcCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const expectedState = sessionStorage.getItem(OIDC_STATE_KEY);
      const codeVerifier = sessionStorage.getItem(OIDC_CODE_VERIFIER_KEY);
      const storedRedirectUri = sessionStorage.getItem(OIDC_REDIRECT_URI_KEY);
      const expectedNonce = sessionStorage.getItem(OIDC_NONCE_KEY);
      const idpUrl = identityManagementUrl || getIdentityManagementURL() || import.meta.env.VITE_IDENTITY_MANAGEMENT_URL;
      const clientId = oidcClientId || import.meta.env.VITE_OIDC_CLIENT_ID;
      const redirectUri = oidcRedirectUri || storedRedirectUri || window.location.href.split('?')[0];

      if (!code || !state || !expectedState || state !== expectedState) {
        throw new Error('OIDC state inválido');
      }

      if (!codeVerifier) {
        throw new Error('OIDC code verifier não encontrado');
      }

      if (!idpUrl || !clientId) {
        throw new Error('Configuração OIDC incompleta');
      }

      const tokenData = await AuthService.exchangeAuthorizationCode({
        identityManagementUrl: idpUrl,
        clientId,
        code,
        redirectUri,
        codeVerifier,
      });

      if (!tokenData.access_token) {
        throw new Error('Access token não retornado pelo OIDC token endpoint');
      }

      if (!tokenData.refresh_token) {
        throw new Error('Refresh token não retornado pelo OIDC token endpoint');
      }

      const accessPayload = decodeJwtPayload(tokenData.access_token);
      if (!accessPayload || AuthService.isTokenExpiringSoon(tokenData.access_token, 0)) {
        throw new Error('Access token OIDC inválido');
      }

      // Se pedimos nonce, ele TEM que voltar e conferir. Antes a checagem so acontecia quando havia
      // id_token na resposta, entao uma resposta sem id_token pulava a validacao em silencio.
      if (expectedNonce) {
        if (!tokenData.id_token) {
          throw new Error('OIDC id_token ausente na resposta');
        }

        const idPayload = decodeJwtPayload(tokenData.id_token);
        if (idPayload?.nonce !== expectedNonce) {
          throw new Error('OIDC nonce inválido');
        }
      }

      const loginData = {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        user: {
          id: Number(claimText(accessPayload, 'user_id', 'nameid', 'sub') || 0),
          username: claimText(accessPayload, 'username', 'unique_name'),
          email: claimText(accessPayload, 'email'),
          name: claimText(accessPayload, 'name', 'given_name')
        },
        contract: {
          contractId: Number(claimText(accessPayload, 'contract_id') || 0),
          systemApplicationName: claimText(accessPayload, 'system_application_name'),
          companyName: claimText(accessPayload, 'company_name'),
          roleName: claimText(accessPayload, 'role_name')
        },
        authenticationStep: 'completed' as const
      };

      sessionStorage.removeItem(OIDC_STATE_KEY);
      sessionStorage.removeItem(OIDC_NONCE_KEY);
      sessionStorage.removeItem(OIDC_CODE_VERIFIER_KEY);
      sessionStorage.removeItem(OIDC_REDIRECT_URI_KEY);

      localStorage.setItem(OIDC_CLIENT_ID_KEY, clientId);
      login(loginData);

      onSuccessRef.current?.();

      navigate(redirectTo, { replace: true });
    };

    processCallback();
  }, [searchParams, login, navigate, redirectTo, identityManagementUrl, oidcClientId, oidcRedirectUri]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
};
