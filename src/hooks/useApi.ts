import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import type { ApiError, RequestState, UseApiOptions } from '../services/http/types';

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
    message: '',
    pagination: null,
  });

  const execute = async (apiCall: () => Promise<any>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      const data = response?.data ?? null;
      const successMessage = typeof response?.message === 'string' ? response.message : '';
      const pagination = response?.pagination ?? null;

      setState({
        data,
        loading: false,
        error: null,
        message: successMessage,
        pagination,
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
        message: '',
        pagination: null,
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
      message: '',
      pagination: null,
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
