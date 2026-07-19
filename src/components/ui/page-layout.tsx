import * as React from "react"
import { Eye, Plus, Edit, Trash2, RefreshCw, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"
import { useI18n } from "../../i18n"
import { Button } from "./button"
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "./dropdown"

export interface PageAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger" | "ghost" | "danger"
  onClick: () => void
  disabled?: boolean
  tooltip?: string
  testId?: string
  // No mobile, mantem o botao visivel em vez de colapsar no menu "Acoes".
  primary?: boolean
}

export interface PageLayoutProps {
  title?: string
  subtitle?: string
  titleClassName?: string
  density?: "default" | "compact"
  filtersSlot?: React.ReactNode
  actionsSlot?: React.ReactNode
  actions?: PageAction[]
  showDefaultActions?: boolean
  onAdd?: () => void
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onRefresh?: () => void
  addLabel?: string
  viewLabel?: string
  editLabel?: string
  deleteLabel?: string
  editDisabled?: boolean
  editDisabledTooltip?: string
  selectedRowsCount?: number
  children?: React.ReactNode
  className?: string
}

// Estados do header: "row" = titulo e acoes na mesma linha; "below" = acoes em
// linha propria abaixo do titulo; "collapsed" = acoes nao primarias no menu "Acoes".
type HeaderFit = "row" | "below" | "collapsed"

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  titleClassName,
  density = "default",
  filtersSlot,
  actionsSlot,
  actions = [],
  showDefaultActions = true,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  addLabel,
  viewLabel,
  editLabel,
  deleteLabel,
  editDisabled,
  editDisabledTooltip,
  selectedRowsCount = 0,
  children,
  className
}) => {
  const { t } = useI18n()
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [headerFit, setHeaderFit] = React.useState<HeaderFit>("row")

  const headerRowRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const inlineActionsRef = React.useRef<HTMLDivElement>(null)

  // Mede a largura real disponivel no conteudo (sensivel a sidebar aberta/fechada),
  // em vez de breakpoints de viewport, para as acoes nunca quebrarem de linha.
  const measureHeaderFit = React.useCallback(() => {
    const row = headerRowRef.current
    const inlineActions = inlineActionsRef.current
    if (!row || !inlineActions) return

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches
    const available = row.clientWidth
    const actionsWidth = inlineActions.scrollWidth
    const titleWidth = (titleRef.current?.scrollWidth ?? 0) + (onRefresh ? 40 : 0)

    let next: HeaderFit
    if (!isDesktop) next = "collapsed"
    else if (titleWidth + 16 + actionsWidth <= available) next = "row"
    else if (actionsWidth <= available) next = "below"
    else next = "collapsed"

    setHeaderFit((prev) => (prev === next ? prev : next))
  }, [onRefresh])

  React.useLayoutEffect(() => {
    measureHeaderFit()
  })

  React.useEffect(() => {
    const row = headerRowRef.current
    if (!row || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(() => measureHeaderFit())
    observer.observe(row)
    if (document.fonts) {
      void document.fonts.ready.then(() => measureHeaderFit())
    }
    return () => observer.disconnect()
  }, [measureHeaderFit])

  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setTimeout(() => setIsRefreshing(false), 600)
    }
  }

  const resolveTooltip = (key: string, fallback: string): string => {
    const value = t(key)
    return value === key ? fallback : value
  }

  const needsSingleSelection = selectedRowsCount !== 1
  const needsAnySelection = selectedRowsCount === 0

  const editTooltip = needsSingleSelection
    ? selectedRowsCount === 0
      ? resolveTooltip("pageLayout.edit.selectOne", "Selecione um registro para editar.")
      : resolveTooltip("pageLayout.edit.selectOnlyOne", "Selecione apenas um registro para editar.")
    : undefined

  const viewTooltip = needsSingleSelection
    ? selectedRowsCount === 0
      ? resolveTooltip("pageLayout.view.selectOne", "Selecione um registro para visualizar.")
      : resolveTooltip("pageLayout.view.selectOnlyOne", "Selecione apenas um registro para visualizar.")
    : undefined

  const deleteTooltip = needsAnySelection
    ? resolveTooltip("pageLayout.delete.selectAtLeastOne", "Selecione ao menos um registro para excluir.")
    : undefined

  const defaultActions: PageAction[] = []

  if (showDefaultActions) {
    if (onView) {
      defaultActions.push({
        key: "view",
        label: viewLabel ?? t("pageLayout.action.view"),
        icon: <Eye className="h-4 w-4" />,
        variant: "ghost",
        onClick: () => onView(),
        disabled: needsSingleSelection,
        tooltip: viewTooltip,
        testId: "crud-view-button"
      })
    }

    if (onDelete) {
      defaultActions.push({
        key: "delete",
        label: deleteLabel ?? t("pageLayout.action.delete"),
        icon: <Trash2 className="h-4 w-4" />,
        variant: "ghost",
        onClick: () => onDelete(),
        disabled: needsAnySelection,
        tooltip: deleteTooltip,
        testId: "crud-delete-button"
      })
    }

    if (onEdit) {
      defaultActions.push({
        key: "edit",
        label: editLabel ?? t("pageLayout.action.edit"),
        icon: <Edit className="h-4 w-4" />,
        variant: "ghost",
        onClick: () => onEdit(),
        disabled: needsSingleSelection || !!editDisabled,
        tooltip: needsSingleSelection ? editTooltip : (editDisabled ? editDisabledTooltip : undefined),
        testId: "crud-edit-button"
      })
    }

    if (onAdd) {
      defaultActions.push({
        key: "add",
        label: addLabel ?? t("pageLayout.action.add"),
        icon: <Plus className="h-4 w-4" />,
        variant: "secondary",
        onClick: onAdd,
        testId: "crud-add-button",
        primary: true
      })
    }
  }

  const allActions = [...actions, ...defaultActions]
  const isCompact = density === "compact"

  // No estado colapsado, move as acoes para um menu "Acoes" quando ha muitas; mantem as marcadas como primary visiveis.
  const hasOverflow = allActions.length > 2
  const collapsedPrimaryActions = hasOverflow ? allActions.filter((a) => a.primary) : allActions
  const collapsedOverflowActions = hasOverflow ? allActions.filter((a) => !a.primary) : []

  const renderActionButton = (action: PageAction, extraClassName?: string) => {
    const button = (
      <Button
        key={action.key}
        data-testid={action.testId}
        variant={action.variant || "outline"}
        size="sm"
        onClick={action.onClick}
        disabled={action.disabled}
        title={!action.disabled ? action.tooltip : undefined}
        className={cn("gap-2 rounded-lg px-3.5", extraClassName)}
      >
        {action.icon}
        {action.label}
      </Button>
    )

    if (action.disabled && action.tooltip) {
      return (
        <span key={action.key} title={action.tooltip} className="inline-flex cursor-not-allowed">
          {button}
        </span>
      )
    }

    return button
  }

  const hasHeader = !!(title || subtitle || allActions.length > 0 || actionsSlot || onRefresh || filtersSlot)

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {hasHeader && <div className={cn("mb-5 flex flex-col gap-4", isCompact ? "py-1" : "py-2")}>
        <div
          className={cn(
            "flex flex-col gap-4",
            isCompact ? "px-1" : "px-0.5"
          )}
        >
          <div
            ref={headerRowRef}
            className={cn(
              "relative flex gap-4",
              headerFit === "row" ? "flex-row items-start justify-between" : "flex-col"
            )}
          >
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <h1
                  ref={titleRef}
                  data-testid="page-title"
                  className={cn(
                    "truncate font-semibold tracking-tight text-primary drop-shadow-[0_1px_0_hsl(var(--primary)/0.15)]",
                    isCompact ? "text-2xl" : "text-3xl",
                    titleClassName
                  )}
                >
                  {title}
                </h1>

                {onRefresh && (
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className={cn(
                      "rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:border-border/80 hover:bg-muted/35 hover:text-foreground",
                      isRefreshing && "text-primary"
                    )}
                    title={t("pageLayout.action.refresh")}
                  >
                    <RefreshCw className={cn("h-4 w-4 transition-transform", isRefreshing && "animate-spin")} />
                  </button>
                )}
              </div>

              {subtitle && (
                <p
                  className={cn(
                    "max-w-3xl text-pretty text-muted-foreground",
                    isCompact ? "text-sm" : "text-[15px]"
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {(allActions.length > 0 || actionsSlot) && (
              <>
                {/* Acoes inline em linha unica; no estado colapsado vira medidor invisivel de largura */}
                <div
                  ref={inlineActionsRef}
                  className={cn(
                    "flex flex-nowrap items-center gap-2",
                    headerFit === "below" && "self-end",
                    headerFit === "collapsed" && "invisible absolute left-0 top-0 h-0 overflow-hidden"
                  )}
                >
                  {actionsSlot}
                  {allActions.map((action) => renderActionButton(action))}
                </div>

                {/* Sem largura para linha unica: menu de overflow a esquerda, acoes primarias (Novo) a direita */}
                {headerFit === "collapsed" && (
                  <div className="flex w-full items-center gap-2 md:justify-end">
                    {actionsSlot}
                    {collapsedOverflowActions.length > 0 && (
                      <Dropdown>
                        <DropdownTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn("gap-2 rounded-lg px-3.5", collapsedPrimaryActions.length === 0 && "flex-1 md:flex-none")}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            {resolveTooltip("pageLayout.action.more", "Ações")}
                          </Button>
                        </DropdownTrigger>
                        <DropdownContent align="end" className="min-w-[12rem]">
                          {collapsedOverflowActions.map((action) => (
                            <DropdownItem
                              key={action.key}
                              data-testid={action.testId}
                              disabled={action.disabled}
                              onSelect={() => action.onClick()}
                              className={cn("gap-2", action.variant === "danger" && "text-destructive focus:text-destructive")}
                            >
                              {action.icon}
                              {action.label}
                            </DropdownItem>
                          ))}
                        </DropdownContent>
                      </Dropdown>
                    )}
                    {collapsedPrimaryActions.map((action) => renderActionButton(action, action.primary ? "flex-1 md:flex-none" : undefined))}
                  </div>
                )}
              </>
            )}
          </div>

          {filtersSlot && (
            <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-muted/18 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/65">
              {filtersSlot}
            </div>
          )}
        </div>
      </div>}

      <div className="overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
