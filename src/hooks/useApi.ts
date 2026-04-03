import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import type { ApiError, PaginationMetadata, RequestState, UseApiOptions } from '../services/http/types';

function isArchonResponse(value: unknown): value is {
  message: string
  data?: unknown
  pagination?: unknown
} {
  return !!value && typeof value === 'object' && 'message' in value
}

function resolvePagination(value: unknown): PaginationMetadata | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  if (
    'page' in value &&
    'pageSize' in value &&
    'totalCount' in value &&
    'totalPages' in value &&
    'hasPreviousPage' in value &&
    'hasNextPage' in value
  ) {
    return {
      page: value.page as number,
      pageSize: value.pageSize as number,
      totalCount: value.totalCount as number,
      totalPages: value.totalPages as number,
      hasPreviousPage: value.hasPreviousPage as boolean,
      hasNextPage: value.hasNextPage as boolean,
    }
  }

  return null
}

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
      const isHttpEnvelope = isArchonResponse(response);
      const data = isHttpEnvelope ? response.data ?? null : response ?? null;
      const successMessage = isHttpEnvelope ? response.message : '';
      const pagination: PaginationMetadata | null = isHttpEnvelope
        ? resolvePagination(response.pagination)
        : resolvePagination(response);

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
