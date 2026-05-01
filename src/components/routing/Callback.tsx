import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { AuthService } from '../../services/auth/authService';
import { getIdentityManagementURL } from '../../services/http/client';
import { OIDC_CODE_VERIFIER_KEY, OIDC_NONCE_KEY, OIDC_REDIRECT_URI_KEY, OIDC_STATE_KEY } from './return-url';

export interface CallbackProps {
  redirectTo?: string;
  identityManagementUrl?: string;
  oidcClientId?: string;
  oidcRedirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface JwtPayload {
  user_id?: string;
  sub?: string;
  nameid?: string;
  username?: string;
  unique_name?: string;
  email?: string | string[];
  name?: string;
  given_name?: string;
  contract_id?: string;
  client_id?: string;
  role_name?: string;
  company_name?: string;
  system_application_name?: string;
  nonce?: string;
  [key: string]: unknown;
}

const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

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

  useEffect(() => {
    const processCallback = async () => {
      try {
        await processOidcCallback();
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }

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

      const accessPayload = parseJwt(tokenData.access_token);
      if (!accessPayload || AuthService.isTokenExpiringSoon(tokenData.access_token, 0)) {
        throw new Error('Access token OIDC inválido');
      }

      if (tokenData.id_token && expectedNonce) {
        const idPayload = parseJwt(tokenData.id_token);
        if (idPayload?.nonce !== expectedNonce) {
          throw new Error('OIDC nonce inválido');
        }
      }

      const email = accessPayload?.email;
      const userEmail = Array.isArray(email) ? email[0] : (email || '');
      const loginData = {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        user: {
          id: Number(accessPayload?.user_id || accessPayload?.nameid || accessPayload?.sub || 0),
          username: accessPayload?.username || accessPayload?.unique_name || '',
          email: userEmail,
          name: accessPayload?.name || accessPayload?.given_name || ''
        },
        contract: {
          contractId: Number(accessPayload?.contract_id || 0),
          systemApplicationName: accessPayload?.system_application_name || '',
          companyName: accessPayload?.company_name || '',
          roleName: accessPayload?.role_name || ''
        },
        authenticationStep: 'completed' as const
      };

      sessionStorage.removeItem(OIDC_STATE_KEY);
      sessionStorage.removeItem(OIDC_NONCE_KEY);
      sessionStorage.removeItem(OIDC_CODE_VERIFIER_KEY);
      sessionStorage.removeItem(OIDC_REDIRECT_URI_KEY);

      localStorage.setItem("@Archon:oidcClientId", clientId);
      login(loginData);

      if (onSuccess) {
        onSuccess();
      }

      navigate(redirectTo, { replace: true });
    };

    processCallback();
  }, [searchParams, login, navigate, redirectTo, identityManagementUrl, oidcClientId, oidcRedirectUri, onSuccess, onError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
};
