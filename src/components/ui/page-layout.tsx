import * as React from "react"
import { Eye, Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import { cn } from "../../lib/utils"
import { useI18n } from "../../i18n"
import { Button } from "./button"
import { useToast } from "./use-toast"

export interface PageAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "outline-primary" | "outline-secondary" | "outline-warning" | "outline-danger" | "ghost" | "danger"
  onClick: () => void
  disabled?: boolean
}

export interface PageLayoutProps {
  title: string
  subtitle?: string
  titleClassName?: string
  density?: "default" | "compact"
  filtersSlot?: React.ReactNode
  actions?: PageAction[]
  showDefaultActions?: boolean
  onAdd?: () => void
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onRefresh?: () => void
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
  actions = [],
  showDefaultActions = true,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  selectedRowsCount = 0,
  children,
  className
}) => {
  const { t } = useI18n()
  const { toast } = useToast()
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

  const handleEdit = () => {
    if (selectedRowsCount === 0) {
      toast({
        title: t("common.toast.warningTitle"),
        description: t("pageLayout.edit.selectOne"),
        variant: 'warning',
      })
      return
    }
    if (selectedRowsCount > 1) {
      toast({
        title: t("common.toast.warningTitle"),
        description: t("pageLayout.edit.selectOnlyOne"),
        variant: 'warning',
      })
      return
    }
    onEdit?.()
  }

  const handleView = () => {
    if (selectedRowsCount === 0) {
      toast({
        title: t("common.toast.warningTitle"),
        description: t("pageLayout.view.selectOne"),
        variant: 'warning',
      })
      return
    }
    if (selectedRowsCount > 1) {
      toast({
        title: t("common.toast.warningTitle"),
        description: t("pageLayout.view.selectOnlyOne"),
        variant: 'warning',
      })
      return
    }
    onView?.()
  }

  const handleDelete = () => {
    if (selectedRowsCount === 0) {
      toast({
        title: t("common.toast.warningTitle"),
        description: t("pageLayout.delete.selectAtLeastOne"),
        variant: 'warning',
      })
      return
    }
    onDelete?.()
  }

  const defaultActions: PageAction[] = []

  if (showDefaultActions) {
    if (onAdd) {
      defaultActions.push({
        key: "add",
        label: t("pageLayout.action.add"),
        icon: <Plus className="h-4 w-4" />,
        variant: "secondary",
        onClick: onAdd
      })
    }

    if (onView) {
      defaultActions.push({
        key: "view",
        label: t("pageLayout.action.view"),
        icon: <Eye className="h-4 w-4" />,
        variant: "outline",
        onClick: handleView
      })
    }

    if (onEdit) {
      defaultActions.push({
        key: "edit",
        label: t("pageLayout.action.edit"),
        icon: <Edit className="h-4 w-4" />,
        variant: "outline",
        onClick: handleEdit
      })
    }

    if (onDelete) {
      defaultActions.push({
        key: "delete",
        label: t("pageLayout.action.delete"),
        icon: <Trash2 className="h-4 w-4" />,
        variant: "outline",
        onClick: handleDelete
      })
    }
  }

  const allActions = [...defaultActions, ...actions]
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

            {allActions.length > 0 && (
              <div className="flex w-full flex-wrap items-center gap-2 xl:w-auto xl:justify-end">
                {allActions.map((action) => (
                  <Button
                    key={action.key}
                    variant={action.variant || "outline"}
                    size="sm"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className="gap-2 rounded-lg px-3.5"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
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
