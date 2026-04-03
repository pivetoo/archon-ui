import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./table"
import { Button } from "./button"

export interface DataTableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
}

export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  rowKey: keyof T | ((record: T) => string | number)
  selectable?: boolean
  selectedRows?: T[]
  onSelectionChange?: (selected: T[]) => void
  onRowClick?: (record: T) => void
  onRowDoubleClick?: (record: T) => void
  className?: string
  emptyText?: string
  dragSelect?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
}

interface SelectionBox {
  startX: number
  startY: number
  endX: number
  endY: number
}

export function DataTable<T = any>({
  columns,
  data,
  loading = false,
  rowKey,
  selectable,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  onRowDoubleClick,
  className,
  emptyText = "Nenhum registro encontrado",
  dragSelect = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50]
}: DataTableProps<T>) {
  const isSelectable = selectable !== undefined ? selectable : !!onSelectionChange
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rowRefs = React.useRef<Map<string | number, HTMLTableRowElement>>(new Map())
  const [selectionBox, setSelectionBox] = React.useState<SelectionBox | null>(null)
  const [showSelectionBox, setShowSelectionBox] = React.useState(false)
  const dragStartRef = React.useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null)
  const isDraggingRef = React.useRef(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(initialPageSize)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [data.length, pageSize])

  const getRowKey = (record: T): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record)
    }
    return record[rowKey] as string | number
  }

  const isRowSelected = (record: T): boolean => {
    const key = getRowKey(record)
    return selectedRows.some((row) => getRowKey(row) === key)
  }

  const getRowsInSelectionBox = React.useCallback((box: SelectionBox): T[] => {
    if (!containerRef.current) return []

    const containerRect = containerRef.current.getBoundingClientRect()
    const boxTop = Math.min(box.startY, box.endY)
    const boxBottom = Math.max(box.startY, box.endY)

    const selected: T[] = []

    paginatedData.forEach((record) => {
      const key = getRowKey(record)
      const rowEl = rowRefs.current.get(key)
      if (!rowEl) return

      const rowRect = rowEl.getBoundingClientRect()
      const rowTop = rowRect.top - containerRect.top + containerRef.current!.scrollTop
      const rowBottom = rowTop + rowRect.height

      if (rowBottom >= boxTop && rowTop <= boxBottom) {
        selected.push(record)
      }
    })

    return selected
  }, [paginatedData, getRowKey])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isSelectable || !onSelectionChange || !dragSelect) return
    if (e.button !== 0) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left + container.scrollLeft
    const y = e.clientY - rect.top + container.scrollTop

    dragStartRef.current = { x, y, clientX: e.clientX, clientY: e.clientY }
    isDraggingRef.current = false
  }

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!dragStartRef.current || !containerRef.current || !onSelectionChange) return

    const dx = Math.abs(e.clientX - dragStartRef.current.clientX)
    const dy = Math.abs(e.clientY - dragStartRef.current.clientY)

    if (!isDraggingRef.current && (dx > 5 || dy > 5)) {
      isDraggingRef.current = true
      setShowSelectionBox(true)
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
        onSelectionChange([])
      }
    }

    if (isDraggingRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left + containerRef.current.scrollLeft
      const y = e.clientY - rect.top + containerRef.current.scrollTop

      const newBox = {
        startX: dragStartRef.current.x,
        startY: dragStartRef.current.y,
        endX: x,
        endY: y
      }
      setSelectionBox(newBox)

      const selected = getRowsInSelectionBox(newBox)
      onSelectionChange(selected)
    }
  }, [getRowsInSelectionBox, onSelectionChange])

  const handleMouseUp = React.useCallback(() => {
    isDraggingRef.current = false
    dragStartRef.current = null
    setShowSelectionBox(false)
    setSelectionBox(null)
  }, [])

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const handleSelectRow = (record: T, e: React.MouseEvent) => {
    if (!isSelectable || !onSelectionChange) return

    const key = getRowKey(record)
    const isSelected = isRowSelected(record)

    if (e.ctrlKey || e.metaKey) {
      if (isSelected) {
        onSelectionChange(selectedRows.filter((row) => getRowKey(row) !== key))
      } else {
        onSelectionChange([...selectedRows, record])
      }
    } else if (e.shiftKey && selectedRows.length > 0) {
      const lastSelectedKey = getRowKey(selectedRows[selectedRows.length - 1])
      const currentIndex = data.findIndex((row) => getRowKey(row) === key)
      const lastIndex = data.findIndex((row) => getRowKey(row) === lastSelectedKey)

      const start = Math.min(currentIndex, lastIndex)
      const end = Math.max(currentIndex, lastIndex)
      const range = data.slice(start, end + 1)

      const newSelection = [...selectedRows]
      range.forEach((row) => {
        const rKey = getRowKey(row)
        if (!newSelection.some((selected) => getRowKey(selected) === rKey)) {
          newSelection.push(row)
        }
      })
      onSelectionChange(newSelection)
    } else {
      if (isSelected) {
        onSelectionChange([])
      } else {
        onSelectionChange([record])
      }
    }
  }

  const handleTableClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isSelectable && onSelectionChange) {
      onSelectionChange([])
    }
  }

  const getSelectionBoxStyle = (): React.CSSProperties | undefined => {
    if (!selectionBox) return undefined

    const left = Math.min(selectionBox.startX, selectionBox.endX)
    const top = Math.min(selectionBox.startY, selectionBox.endY)
    const width = Math.abs(selectionBox.endX - selectionBox.startX)
    const height = Math.abs(selectionBox.endY - selectionBox.startY)

    return {
      position: 'absolute',
      left,
      top,
      width,
      height,
      backgroundColor: 'hsl(var(--primary) / 0.1)',
      border: '1px solid hsl(var(--primary) / 0.5)',
      borderRadius: '2px',
      pointerEvents: 'none',
      zIndex: 10
    }
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        ref={containerRef}
        className="rounded-md border relative"
        onClick={handleTableClick}
        onMouseDown={handleMouseDown}
      >
        {showSelectionBox && selectionBox && (
          <div style={getSelectionBoxStyle()} />
        )}
        <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (isSelectable ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((record, index) => {
              const key = getRowKey(record)
              const selected = isRowSelected(record)

              return (
                <TableRow
                  key={key}
                  ref={(el) => {
                    if (el) rowRefs.current.set(key, el)
                  }}
                  data-row="true"
                  data-state={selected ? "selected" : ""}
                  onClick={(e) => {
                    if (isSelectable) {
                      handleSelectRow(record, e)
                    } else {
                      onRowClick?.(record)
                    }
                  }}
                  onDoubleClick={() => onRowDoubleClick?.(record)}
                  className={cn(
                    isSelectable || onRowClick || onRowDoubleClick ? "cursor-pointer" : "",
                    isSelectable && "select-none",
                    selected && "!bg-secondary/20"
                  )}
                >
                  {columns.map((column) => {
                    const value = column.dataIndex
                      ? record[column.dataIndex]
                      : undefined

                    return (
                      <TableCell key={column.key}>
                        {column.render
                          ? column.render(value, record, index)
                          : (value as React.ReactNode) || "-"}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          )}
        </TableBody>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Linhas por página:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-8 rounded border border-input bg-background px-2 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>
              {startIndex + 1}-{Math.min(endIndex, data.length)} de {data.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm">
              {currentPage} / {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
