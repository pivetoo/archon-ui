import type { PagedRequest } from "./types"

export function buildPaginationQuery(params?: PagedRequest): string {
  const searchParams = new URLSearchParams()

  if (params?.page) {
    searchParams.set("page", params.page.toString())
  }

  if (params?.pageSize) {
    searchParams.set("pageSize", params.pageSize.toString())
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}
