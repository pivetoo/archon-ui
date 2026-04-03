import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts';

export interface CallbackProps {
  redirectTo?: string;
  identityManagementUrl?: string;
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
  contract_id?: string;
  client_id?: string;
  role_name?: string;
  company_name?: string;
  system_application_name?: string;
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
            contractId: Number(payload?.contract_id || 0),
            systemApplicationName: payload?.system_application_name || '',
            companyName: payload?.company_name || '',
            redirectUris: '',
            roleName: payload?.role_name || ''
          },
          authenticationStep: 'completed' as const
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

        const idpUrl = identityManagementUrl || import.meta.env.VITE_IDENTITY_MANAGEMENT_URL;
        if (idpUrl) {
          window.location.href = idpUrl;
        }
      }
    };

    processCallback();
  }, [searchParams, login, navigate, redirectTo, identityManagementUrl, onSuccess, onError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
};
