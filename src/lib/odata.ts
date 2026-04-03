import type { ODataParams, PaginationParams } from '../types/odata'

export class ODataHelper {
  static buildQuery(params: ODataParams): string {
    const queryParts: string[] = []

    if (params.$top !== undefined) queryParts.push(`$top=${params.$top}`)
    if (params.$skip !== undefined) queryParts.push(`$skip=${params.$skip}`)
    if (params.$count !== undefined) queryParts.push(`$count=${params.$count}`)
    if (params.$filter) queryParts.push(`$filter=${encodeURIComponent(params.$filter)}`)
    if (params.$orderby) queryParts.push(`$orderby=${encodeURIComponent(params.$orderby)}`)
    if (params.$select) queryParts.push(`$select=${params.$select}`)
    if (params.$expand) queryParts.push(`$expand=${params.$expand}`)

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
  }

  static fromPaginationParams(params: PaginationParams): ODataParams {
    const oDataParams: ODataParams = {}

    if (params.pageSize) {
      oDataParams.$top = params.pageSize
    }

    if (params.page && params.pageSize) {
      oDataParams.$skip = (params.page - 1) * params.pageSize
    }

    if (params.orderBy) {
      oDataParams.$orderby = params.orderBy
    }

    if (params.search) {
      oDataParams.$filter = `contains(tolower(nome), '${params.search.toLowerCase()}')`
    }

    oDataParams.$count = true

    return oDataParams
  }

  static createSearchFilter(searchTerm: string, fields: string[]): string {
    if (!searchTerm || fields.length === 0) return ''

    const term = searchTerm.toLowerCase()
    const filters = fields.map(field =>
      `contains(tolower(${field}), '${term}')`
    )

    return filters.join(' or ')
  }

  static createBooleanFilter(field: string, value: boolean): string {
    return `${field} eq ${value}`
  }

  static createDateFilter(field: string, operator: 'eq' | 'gt' | 'lt' | 'ge' | 'le', date: Date): string {
    const isoDate = date.toISOString()
    return `${field} ${operator} ${isoDate}`
  }

  static combineFilters(filters: string[], operator: 'and' | 'or' = 'and'): string {
    const validFilters = filters.filter(f => f.trim().length > 0)
    if (validFilters.length === 0) return ''
    if (validFilters.length === 1) return validFilters[0]

    return validFilters.map(f => `(${f})`).join(` ${operator} `)
  }

  static extractData<T>(response: any): T[] {
    return response.d?.results || []
  }

  static extractCount(response: any): number {
    return response.d?.__count || 0
  }

  static processResponse<T>(
    response: any,
    params?: { page?: number; pageSize?: number },
    mapFn?: (item: any) => T
  ): { data: T[]; total: number; page?: number; pageSize?: number } {
    const rawData = Array.isArray(response) ? response : this.extractData<any>(response)
    const data = mapFn ? rawData.map(mapFn) : rawData
    const total = Array.isArray(response) ? response.length : this.extractCount(response)

    return {
      data,
      total,
      page: params?.page,
      pageSize: params?.pageSize
    }
  }
}
