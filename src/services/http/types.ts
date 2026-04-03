export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  statusCode?: number
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
  isApiError: boolean
}

export interface RequestState<T = any> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

export interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
  showSuccessMessage?: boolean
  showErrorMessage?: boolean
}
