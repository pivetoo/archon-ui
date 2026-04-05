import { useState } from 'react';
import { useI18n } from '../i18n';
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

function getValidationMessages(error: ApiError): string[] {
  if (!error.errors) {
    return []
  }

  if (Array.isArray(error.errors)) {
    return error.errors.filter((item): item is string => typeof item === 'string')
  }

  if (typeof error.errors === 'object') {
    const validationErrors = error.errors as Record<string, unknown>

    return Object.values(validationErrors)
      .flatMap((value) => {
        if (Array.isArray(value)) {
          return value.filter((item): item is string => typeof item === 'string')
        }

        return typeof value === 'string' ? [value] : []
      })
  }

  return []
}

function buildErrorDescription(apiError: ApiError, t: (key: string) => string): string {
  const validationMessages = getValidationMessages(apiError)

  if (validationMessages.length === 0) {
    return apiError.message
  }

  const visibleMessages = validationMessages.slice(0, 2)
  const hiddenCount = validationMessages.length - visibleMessages.length
  const showMessage =
    apiError.message &&
    apiError.message.trim().length > 0 &&
    apiError.message.trim().toLowerCase() !== 'validation failed.'

  const lines: string[] = []

  if (showMessage) {
    lines.push(apiError.message)
  }

  lines.push(...visibleMessages.map((message) => `- ${message}`))

  if (hiddenCount > 0) {
    lines.push(t("common.validation.moreErrors").replace("{0}", String(hiddenCount)))
  }

  return lines.join('\n')
}

function getErrorTitle(apiError: ApiError, t: (key: string) => string): string {
  const hasValidationMessages = getValidationMessages(apiError).length > 0
  const normalizedMessage = apiError.message?.trim()

  if (normalizedMessage) {
    if (normalizedMessage.toLowerCase() === 'validation failed.') {
      return t("validation.failed")
    }

    return normalizedMessage
  }

  return hasValidationMessages ? t("validation.failed") : t("common.error.title")
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const { t } = useI18n()
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
          title: t("common.success.title"),
          description: successMessage,
          variant: 'success',
        });
      }

      return data;
    } catch (error: any) {
      const apiError: ApiError = error.isApiError ? error : {
        message: t("common.error.unknown"),
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
          title: getErrorTitle(apiError, t),
          description: buildErrorDescription(apiError, t),
          variant: 'destructive',
        });
      }

      if (options.throwOnError) {
        throw apiError;
      }

      return null;
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
