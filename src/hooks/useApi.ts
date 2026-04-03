import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import type { ApiError, RequestState, UseApiOptions } from '../services/http/types';

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (apiCall: () => Promise<any>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      const data = (response && typeof response === 'object' && ('total' in response || 'page' in response))
        ? response
        : (response.data || response);
      const successMessage =
        (typeof response?.message === 'string' ? response.message : undefined) ||
        (typeof response?.data?.message === 'string' ? response.data.message : undefined);

      setState({
        data,
        loading: false,
        error: null,
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (options.showSuccessMessage && successMessage) {
        toast({
          title: 'Sucesso',
          description: successMessage,
          variant: 'success',
        });
      }

      return data;
    } catch (error: any) {
      const apiError: ApiError = error.isApiError ? error : {
        message: 'Erro desconhecido',
        status: 500,
        isApiError: true,
      };

      setState({
        data: null,
        loading: false,
        error: apiError,
      });

      if (options.onError) {
        options.onError(apiError);
      }

      if (options.showErrorMessage !== false) {
        toast({
          title: 'Erro',
          description: apiError.message,
          variant: 'destructive',
        });
      }

      throw apiError;
    }
  };

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...state,
    execute,
    reset,
    isLoading: state.loading,
    hasError: !!state.error,
    hasData: !!state.data,
  };
}
