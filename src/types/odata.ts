export interface ODataResponse<T> {
  value?: T[]
  '@odata.count'?: number
  '@odata.nextLink'?: string
  d?: {
    __count?: number
    results?: T[]
  }
}

export interface ODataParams {
  $top?: number
  $skip?: number
  $count?: boolean
  $filter?: string
  $orderby?: string
  $select?: string
  $expand?: string
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  orderBy?: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page?: number
  pageSize?: number
}
