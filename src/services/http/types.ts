export interface PaginationMetadata {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface PagedRequest {
  page?: number
  pageSize?: number
}

export interface PaginationParams extends PagedRequest {
  search?: string
  orderBy?: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page?: number
  pageSize?: number
}

export interface ApiResponse<T = unknown, TErrors = unknown> {
  message: string
  data?: T
  errors?: TErrors
  pagination?: PaginationMetadata
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]> | string[] | unknown
  isApiError: boolean
}

export interface RequestState<T = unknown> {
  data: T | null
  loading: boolean
  error: ApiError | null
  message: string
  pagination: PaginationMetadata | null
}

export interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
  showSuccessMessage?: boolean
  showErrorMessage?: boolean
}
