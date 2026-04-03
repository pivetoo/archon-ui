import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts';

export interface CallbackProps {
  redirectTo?: string;
  identityProviderUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface JwtPayload {
  user_id?: string;
  nameid?: string;
  username?: string;
  unique_name?: string;
  email?: string | string[];
  name?: string;
  given_name?: string;
  contrato_id?: string;
  client_id?: string;
  perfil_name?: string;
  empresa_name?: string;
  sistema_name?: string;
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
  identityProviderUrl,
  onSuccess,
  onError
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) {
          throw new Error('Tokens não encontrados na URL');
        }

        const payload = parseJwt(accessToken);

        const email = payload?.email;
        const userEmail = Array.isArray(email) ? email[0] : (email || '');

        const loginData = {
          accessToken,
          refreshToken,
          user: {
            id: Number(payload?.user_id || payload?.nameid || 0),
            username: payload?.username || payload?.unique_name || '',
            email: userEmail,
            name: payload?.name || payload?.given_name || ''
          },
          contract: {
            contratoId: Number(payload?.contrato_id || 0),
            sistemaName: payload?.sistema_name || '',
            empresaName: payload?.empresa_name || '',
            redirectUris: [],
            perfilName: payload?.perfil_name || ''
          }
        };

        login(loginData);

        if (onSuccess) {
          onSuccess();
        }

        navigate(redirectTo, { replace: true });
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }

        const idpUrl = identityProviderUrl || import.meta.env.VITE_IDENTITY_PROVIDER_URL;
        if (idpUrl) {
          window.location.href = idpUrl;
        }
      }
    };

    processCallback();
  }, [searchParams, login, navigate, redirectTo, identityProviderUrl, onSuccess, onError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
};
