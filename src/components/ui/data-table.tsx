import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { useI18n } from "../../i18n"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./table"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownTrigger } from "./dropdown"

export interface DataTableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  hiddenBelow?: 'sm' | 'md' | 'lg'
  // No layout de card (mobile): coluna-titulo do card.
  primary?: boolean
  // No layout de card (mobile): renderiza no canto superior direito (ex.: badge de status).
  cardTag?: boolean
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
  totalCount?: number
  page?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  // Abaixo de md, renderiza cada registro como card empilhado (default). false mantem a tabela com scroll horizontal.
  mobileCards?: boolean
  // Menu "..." no fim de cada linha (visivel no hover; sempre visivel em tela de toque). Substitui o
  // fluxo de selecionar a linha e usar editar/excluir do PageLayout.
  rowActions?: DataTableRowAction<T>[] | ((record: T) => DataTableRowAction<T>[])
  // Liga a coluna de checkbox e a barra de acoes em lote. Nesse modo o clique na linha nao seleciona:
  // ele chama onRowClick (abrir o registro), e a selecao passa a ser so pelos checkboxes.
  bulkActions?: DataTableBulkAction<T>[]
}

export interface DataTableRowAction<T = any> {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: (record: T) => void
  variant?: "default" | "danger"
  disabled?: boolean | ((record: T) => boolean)
  hidden?: (record: T) => boolean
}

export interface DataTableBulkAction<T = any> {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: (selected: T[]) => void
  variant?: "default" | "danger"
  disabled?: boolean
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
  emptyText,
  dragSelect = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  totalCount,
  page: controlledPage,
  onPageChange,
  onPageSizeChange,
  mobileCards = true,
  rowActions,
  bulkActions,
}: DataTableProps<T>) {
  const { t } = useI18n()
  const isSelectable = selectable !== undefined ? selectable : !!onSelectionChange
  const checkboxSelection = !!bulkActions && !!onSelectionChange
  const rowSelectsOnClick = isSelectable && !checkboxSelection
  const hasRowActions = !!rowActions
  const extraColumnCount = (checkboxSelection ? 1 : 0) + (hasRowActions ? 1 : 0)
  const hasSelection = selectedRows.length > 0
  // Checkbox so aparece no hover da linha (ou com foco/toque). Com algum registro marcado, todos
  // ficam visiveis para facilitar marcar os demais.
  const hoverRevealClass = hasSelection
    ? undefined
    : "opacity-0 transition-opacity focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rowRefs = React.useRef<Map<string | number, HTMLTableRowElement>>(new Map())
  const pageSizeSelectId = React.useId()
  const [selectionBox, setSelectionBox] = React.useState<SelectionBox | null>(null)
  const [showSelectionBox, setShowSelectionBox] = React.useState(false)
  const dragStartRef = React.useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null)
  const isDraggingRef = React.useRef(false)

  const isServerSide = !!onPageChange

  const [internalPage, setInternalPage] = React.useState(1)
  const [internalPageSize, setInternalPageSize] = React.useState(initialPageSize)

  const currentPage = isServerSide ? (controlledPage ?? 1) : internalPage
  const pageSize = isServerSide ? initialPageSize : internalPageSize
  const effectiveTotalCount = isServerSide ? (totalCount ?? 0) : data.length
  const resolvedEmptyText = emptyText || t("common.state.noRecordsFound")

  const hiddenBelowMap: Record<string, string> = {
    sm: 'hidden sm:table-cell',
    md: 'hidden md:table-cell',
    lg: 'hidden lg:table-cell',
  }
  const getHiddenClass = (col: DataTableColumn<T>) =>
    col.hiddenBelow ? hiddenBelowMap[col.hiddenBelow] : undefined

  const primaryColumn = columns.find((c) => c.primary) ?? columns[0]
  const tagColumn = columns.find((c) => c.cardTag)
  const cardBodyColumns = columns.filter(
    (c) => c !== primaryColumn && c !== tagColumn && !c.hiddenBelow
  )

  const renderCellValue = (column: DataTableColumn<T>, record: T, index: number): React.ReactNode => {
    const value = column.dataIndex ? record[column.dataIndex] : undefined
    return column.render ? column.render(value, record, index) : ((value as React.ReactNode) || "-")
  }

  // Clique em botao/link/campo dentro da linha (ex.: coluna de acoes) nao deve
  // disparar selecao/onRowClick da linha - senao o toggle de selecao da linha
  // sobrescreve o estado que o proprio botao acabou de definir (ex.: abrir modal
  // de edicao com o registro certo, mas a linha ja selecionada desseleciona e
  // zera o registro no mesmo clique, abrindo o modal vazio).
  const isInteractiveClickTarget = (e: React.MouseEvent): boolean => {
    const target = e.target as HTMLElement
    return !!target.closest('button, a, input, select, textarea, [role="button"], [role="checkbox"], [role="menuitem"]')
  }

  // No card (mobile): tocar no corpo seleciona o registro (habilita a toolbar);
  // quando ha detalhe (onRowDoubleClick) e o corpo nao abre detalhe, a seta abre.
  const handleCardBodyClick = (record: T, e: React.MouseEvent) => {
    if (isInteractiveClickTarget(e)) return
    if (rowSelectsOnClick && onSelectionChange) {
      onSelectionChange(isRowSelected(record) ? [] : [record])
    } else if (onRowClick) {
      onRowClick(record)
    } else if (onRowDoubleClick) {
      onRowDoubleClick(record)
    }
  }
  const cardBodyTappable = rowSelectsOnClick || !!onRowClick || !!onRowDoubleClick
  const showCardDetailArrow = !!onRowDoubleClick && (rowSelectsOnClick || !!onRowClick)

  const resolveLabel = (key: string, fallback: string): string => {
    const value = t(key)
    return value === key ? fallback : value
  }

  const totalPages = Math.ceil(effectiveTotalCount / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = isServerSide
    ? startIndex + data.length
    : Math.min(startIndex + pageSize, data.length)
  const paginatedData = isServerSide ? data : data.slice(startIndex, startIndex + pageSize)

  React.useEffect(() => {
    if (!isServerSide) {
      setInternalPage(1)
    }
  }, [data.length, internalPageSize, isServerSide])

  const setCurrentPage = (p: number | ((prev: number) => number)) => {
    const newPage = typeof p === 'function' ? p(currentPage) : p
    if (isServerSide) {
      onPageChange!(newPage)
    } else {
      setInternalPage(newPage)
    }
  }

  const changePageSize = (newSize: number) => {
    if (isServerSide) {
      onPageSizeChange?.(newSize)
    } else {
      setInternalPageSize(newSize)
      setInternalPage(1)
    }
  }

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
    if (!rowSelectsOnClick || !onSelectionChange || !dragSelect) return
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
    if (e.target === e.currentTarget && rowSelectsOnClick && onSelectionChange) {
      onSelectionChange([])
    }
  }

  const toggleRowChecked = (record: T) => {
    if (!onSelectionChange) return
    const key = getRowKey(record)
    onSelectionChange(
      isRowSelected(record)
        ? selectedRows.filter((row) => getRowKey(row) !== key)
        : [...selectedRows, record]
    )
  }

  const pageAllChecked = paginatedData.length > 0 && paginatedData.every((record) => isRowSelected(record))

  const togglePageChecked = () => {
    if (!onSelectionChange) return
    const pageKeys = new Set(paginatedData.map((record) => getRowKey(record)))
    if (pageAllChecked) {
      onSelectionChange(selectedRows.filter((row) => !pageKeys.has(getRowKey(row))))
      return
    }
    const missing = paginatedData.filter((record) => !isRowSelected(record))
    onSelectionChange([...selectedRows, ...missing])
  }

  const resolveRowActions = (record: T): DataTableRowAction<T>[] => {
    if (!rowActions) return []
    const actions = typeof rowActions === "function" ? rowActions(record) : rowActions
    return actions.filter((action) => !action.hidden?.(record))
  }

  const renderRowActionsMenu = (record: T, alwaysVisible: boolean) => {
    const actions = resolveRowActions(record)
    if (actions.length === 0) return null
    const regular = actions.filter((action) => action.variant !== "danger")
    const danger = actions.filter((action) => action.variant === "danger")
    const renderItem = (action: DataTableRowAction<T>) => {
      const disabled = typeof action.disabled === "function" ? action.disabled(record) : !!action.disabled
      return (
        <DropdownItem
          key={action.key}
          disabled={disabled}
          onSelect={() => action.onClick(record)}
          className={cn("gap-2 [&_svg]:h-4 [&_svg]:w-4", action.variant === "danger" && "text-destructive focus:text-destructive")}
        >
          {action.icon}
          {action.label}
        </DropdownItem>
      )
    }

    return (
      <Dropdown modal={false}>
        <DropdownTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={resolveLabel("common.table.rowActions", "Ações")}
            className={cn(
              "h-8 w-8 text-muted-foreground hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground",
              !alwaysVisible && "opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100 [@media(hover:none)]:opacity-100"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownTrigger>
        <DropdownContent align="end" className="min-w-[10rem]">
          {regular.map(renderItem)}
          {regular.length > 0 && danger.length > 0 && <DropdownSeparator />}
          {danger.map(renderItem)}
        </DropdownContent>
      </Dropdown>
    )
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
    // No mobile (modo card) a moldura da tabela (borda + overflow-hidden + arredondamento) e dispensada:
    // os cards viram uma lista solta na pagina. Isso evita o clip que cortava a borda lateral do card
    // selecionado. A partir de md, a moldura volta para a tabela.
    <div className={cn("flex flex-col md:overflow-hidden md:rounded-lg md:border md:border-border/70 md:bg-background md:shadow-sm", className)}>
      {checkboxSelection && hasSelection && (
        // Barra de lote flutuante no rodape da tela: o contêiner externo so centraliza (sem transform,
        // que brigaria com a animacao de entrada) e deixa passar o clique fora da barra.
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
          <div
            role="toolbar"
            aria-label={resolveLabel("common.table.bulkActions", "Ações em lote")}
            className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 pl-3 text-card-foreground shadow-[0_16px_40px_-16px_rgba(15,23,42,0.45)] animate-in fade-in-0 slide-in-from-bottom-2"
          >
            <span className="whitespace-nowrap pr-2 text-sm font-medium">
              {selectedRows.length} {resolveLabel("common.table.selected", "selecionado(s)")}
            </span>
            <span className="h-5 w-px shrink-0 bg-border" aria-hidden />
            {bulkActions!.map((action) => (
              <Button
                key={action.key}
                size="sm"
                variant="ghost"
                icon={action.icon}
                disabled={action.disabled}
                onClick={() => action.onClick(selectedRows)}
                className={cn(action.variant === "danger" && "text-destructive hover:bg-destructive/10 hover:text-destructive")}
              >
                {action.label}
              </Button>
            ))}
            <span className="h-5 w-px shrink-0 bg-border" aria-hidden />
            <Button
              variant="ghost"
              size="icon"
              aria-label={resolveLabel("common.table.clearSelection", "Limpar seleção")}
              tooltip={resolveLabel("common.table.clearSelection", "Limpar seleção")}
              onClick={() => onSelectionChange?.([])}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className={cn("relative", mobileCards && "hidden md:block")}
        onClick={handleTableClick}
        onMouseDown={handleMouseDown}
      >
        {showSelectionBox && selectionBox && (
          <div style={getSelectionBoxStyle()} />
        )}
        <Table>
          <TableHeader>
            <TableRow className="group/header">
              {checkboxSelection && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={pageAllChecked}
                    onCheckedChange={togglePageChecked}
                    disabled={paginatedData.length === 0}
                    aria-label={resolveLabel("common.table.selectAll", "Selecionar todos")}
                    className={cn(hoverRevealClass, !hasSelection && "group-hover/header:opacity-100")}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={getHiddenClass(column)}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.title}
                </TableHead>
              ))}
              {hasRowActions && (
                <TableHead className="w-12">
                  <span className="sr-only">{resolveLabel("common.table.rowActions", "Ações")}</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {checkboxSelection && <TableCell className="w-10" />}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={getHiddenClass(column)}>
                      <div className="h-4 animate-pulse rounded-full bg-muted" />
                    </TableCell>
                  ))}
                  {hasRowActions && <TableCell className="w-12" />}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + extraColumnCount}
                  className="py-14 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-2 text-center">
                    <div className="rounded-2xl border border-border/70 bg-muted/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t("common.state.noResults")}
                    </div>
                    <div className="text-base font-medium text-foreground">
                      {resolvedEmptyText}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("common.state.adjustFilters")}
                    </div>
                  </div>
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
                      if (isInteractiveClickTarget(e)) return
                      if (rowSelectsOnClick) {
                        handleSelectRow(record, e)
                      } else {
                        onRowClick?.(record)
                      }
                    }}
                    onDoubleClick={() => onRowDoubleClick?.(record)}
                    className={cn(
                      "group",
                      rowSelectsOnClick || onRowClick || onRowDoubleClick ? "cursor-pointer" : "",
                      rowSelectsOnClick && "select-none",
                      selected && "!bg-[hsl(var(--secondary)/0.22)] hover:!bg-[hsl(var(--secondary)/0.28)]"
                    )}
                  >
                    {checkboxSelection && (
                      <TableCell className="w-10">
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleRowChecked(record)}
                          aria-label={resolveLabel("common.table.selectRow", "Selecionar registro")}
                          className={cn(hoverRevealClass, !hasSelection && "group-hover:opacity-100")}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = column.dataIndex
                        ? record[column.dataIndex]
                        : undefined

                      return (
                        <TableCell key={column.key} className={getHiddenClass(column)}>
                          {column.render
                            ? column.render(value, record, index)
                            : (value as React.ReactNode) || "-"}
                        </TableCell>
                      )
                    })}
                    {hasRowActions && (
                      <TableCell className="w-12 py-1 text-right">
                        {renderRowActionsMenu(record, false)}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {mobileCards && (
        <div className="flex flex-col gap-2.5 p-3 md:hidden">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={`card-skeleton-${i}`} className="rounded-xl border border-border/70 p-3.5">
                <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((__, j) => (
                    <div key={j} className="h-3 animate-pulse rounded bg-muted" />
                  ))}
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="mx-auto flex max-w-sm flex-col items-center gap-2 px-4 py-12 text-center">
              <div className="rounded-2xl border border-border/70 bg-muted/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("common.state.noResults")}
              </div>
              <div className="text-base font-medium text-foreground">{resolvedEmptyText}</div>
              <div className="text-sm text-muted-foreground">{t("common.state.adjustFilters")}</div>
            </div>
          ) : (
            paginatedData.map((record, index) => {
              const key = getRowKey(record)
              const selected = isRowSelected(record)

              return (
                <div
                  key={key}
                  onClick={(e) => handleCardBodyClick(record, e)}
                  data-state={selected ? "selected" : ""}
                  className={cn(
                    "rounded-xl border border-border/70 bg-card p-3.5 transition-colors",
                    cardBodyTappable && "cursor-pointer active:scale-[0.99] active:bg-accent",
                    selected && "border-secondary/50 bg-[hsl(var(--secondary)/0.12)]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {checkboxSelection && (
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleRowChecked(record)}
                        aria-label={resolveLabel("common.table.selectRow", "Selecionar registro")}
                        className="self-start mt-0.5"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 break-words text-[15px] font-semibold leading-tight">
                          {renderCellValue(primaryColumn, record, index)}
                        </div>
                        {tagColumn && (
                          <div className="shrink-0">{renderCellValue(tagColumn, record, index)}</div>
                        )}
                      </div>
                      {cardBodyColumns.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
                          {cardBodyColumns.map((column) => (
                            <div key={column.key} className="min-w-0">
                              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                {column.title}
                              </div>
                              <div className="truncate text-sm font-medium">
                                {renderCellValue(column, record, index)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {hasRowActions && (
                      <div className="shrink-0 self-start">{renderRowActionsMenu(record, true)}</div>
                    )}
                    {showCardDetailArrow && (
                      <button
                        type="button"
                        aria-label={resolveLabel("common.action.openDetails", "Abrir detalhes")}
                        onClick={(event) => {
                          event.stopPropagation()
                          onRowDoubleClick?.(record)
                        }}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {data.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border/70 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <label htmlFor={pageSizeSelectId} className="hidden sm:inline">{t("common.table.rowsPerPage")}</label>
            <select
              id={pageSizeSelectId}
              name="pageSize"
              aria-label={t("common.table.rowsPerPage")}
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
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
              {startIndex + 1}-{endIndex} de {effectiveTotalCount}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="hidden h-9 w-9 rounded-md p-0 sm:inline-flex"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-md p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 text-sm font-medium text-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-md p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="hidden h-9 w-9 rounded-md p-0 sm:inline-flex"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
