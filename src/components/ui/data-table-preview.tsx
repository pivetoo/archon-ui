import * as React from "react"
import { useI18n } from "../../i18n"
import { cn } from "../../lib/utils"

export interface DataTablePreviewColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T) => React.ReactNode
  width?: string | number
}

export interface DataTablePreviewProps<T = any> {
  columns: DataTablePreviewColumn<T>[]
  data: T[]
  rowKey: keyof T | ((record: T) => string | number)
  selectedRow?: T | null
  onRowSelect?: (record: T | null) => void
  renderDetail?: (record: T) => React.ReactNode
  renderPagination?: () => React.ReactNode
  className?: string
  tableClassName?: string
  detailClassName?: string
  gridRatio?: [number, number]
}

export function DataTablePreview<T = any>({
  columns,
  data,
  rowKey,
  selectedRow,
  onRowSelect,
  renderDetail,
  renderPagination,
  className,
  tableClassName,
  detailClassName,
  gridRatio = [7, 5],
}: DataTablePreviewProps<T>) {
  const { t } = useI18n()
  const tableSpanClass = gridRatio[0] >= 8 ? "xl:col-span-8" : gridRatio[0] <= 6 ? "xl:col-span-6" : "xl:col-span-7"
  const detailSpanClass = gridRatio[1] >= 6 ? "xl:col-span-6" : gridRatio[1] <= 4 ? "xl:col-span-4" : "xl:col-span-5"

  const getRowKey = (record: T): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record)
    }
    return record[rowKey] as string | number
  }

  const handleRowClick = (record: T) => {
    if (onRowSelect) {
      const isSameRow = selectedRow && getRowKey(selectedRow) === getRowKey(record)
      onRowSelect(isSameRow ? null : record)
    }
  }

  return (
    <div className={cn("grid gap-5 xl:grid-cols-12", className)}>
      <div
        className={cn("min-w-0", tableSpanClass, tableClassName)}
      >
        <div className="overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/80 bg-[hsl(var(--muted-foreground)/0.07)]">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="h-10 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      {t("common.state.noRecordsFound")}
                    </td>
                  </tr>
                ) : (
                  data.map((record) => {
                    const key = getRowKey(record)
                    const isSelected = selectedRow && getRowKey(selectedRow) === key

                    return (
                      <tr
                        key={key}
                        onClick={() => handleRowClick(record)}
                        className={cn(
                          "cursor-pointer border-b border-border/60 transition-colors",
                          isSelected ? "bg-[hsl(var(--secondary)/0.22)]" : "hover:bg-muted/35"
                        )}
                      >
                        {columns.map((column) => {
                          const value = column.dataIndex
                            ? record[column.dataIndex]
                            : undefined

                          return (
                            <td key={column.key} className="px-3 py-2.5 align-middle">
                              {column.render
                                ? column.render(value, record)
                                : (value as React.ReactNode) || "-"}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {renderPagination && (
            <div className="border-t border-border/70 bg-muted/20">
              {renderPagination()}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn("min-w-0 xl:border-l xl:border-border/80 xl:pl-5", detailSpanClass, detailClassName)}
      >
        {selectedRow && renderDetail ? (
          <div className="sticky top-6 overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm">
            {renderDetail(selectedRow)}
          </div>
        ) : null}
      </div>
    </div>
  )
}
