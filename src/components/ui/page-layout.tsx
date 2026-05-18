import * as React from "react"
import { Eye, Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import { cn } from "../../lib/utils"
import { useI18n } from "../../i18n"
import { Button } from "./button"

export interface PageAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger" | "ghost" | "danger"
  onClick: () => void
  disabled?: boolean
  tooltip?: string
  testId?: string
}

export interface PageLayoutProps {
  title: string
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
  selectedRowsCount?: number
  children?: React.ReactNode
  className?: string
}

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
  selectedRowsCount = 0,
  children,
  className
}) => {
  const { t } = useI18n()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

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
        disabled: needsSingleSelection,
        tooltip: editTooltip,
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
        testId: "crud-add-button"
      })
    }
  }

  const allActions = [...actions, ...defaultActions]
  const isCompact = density === "compact"

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <div className={cn("mb-5 flex flex-col gap-4", isCompact ? "py-1" : "py-2")}>
        <div
          className={cn(
            "flex flex-col gap-4",
            isCompact ? "px-1" : "px-0.5"
          )}
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <h1
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
              <div className="flex w-full flex-wrap items-center gap-2 xl:w-auto xl:justify-end">
                {actionsSlot}
                {allActions.map((action) => {
                  const button = (
                    <Button
                      key={action.key}
                      data-testid={action.testId}
                      variant={action.variant || "outline"}
                      size="sm"
                      onClick={action.onClick}
                      disabled={action.disabled}
                      title={!action.disabled ? action.tooltip : undefined}
                      className="gap-2 rounded-lg px-3.5"
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
                })}
              </div>
            )}
          </div>

          {filtersSlot && (
            <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-muted/18 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/65">
              {filtersSlot}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-auto">
        {children}
      </div>
    </div>
  )
}
