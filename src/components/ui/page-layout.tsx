import * as React from "react"
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import { cn } from "../../lib/utils"
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
  icon?: React.ReactNode
  titleClassName?: string
  density?: "default" | "compact"
  filtersSlot?: React.ReactNode
  actions?: PageAction[]
  showDefaultActions?: boolean
  onAdd?: () => void
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
  icon,
  titleClassName,
  density = "default",
  filtersSlot,
  actions = [],
  showDefaultActions = true,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
  selectedRowsCount = 0,
  children,
  className
}) => {
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
        title: 'Atenção',
        description: 'Selecione um registro para editar.',
        variant: 'warning',
      })
      return
    }
    if (selectedRowsCount > 1) {
      toast({
        title: 'Atenção',
        description: 'Selecione apenas um registro para editar.',
        variant: 'warning',
      })
      return
    }
    onEdit?.()
  }

  const handleDelete = () => {
    if (selectedRowsCount === 0) {
      toast({
        title: 'Atenção',
        description: 'Selecione ao menos um registro para excluir.',
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
        label: "Incluir",
        icon: <Plus className="h-4 w-4" />,
        variant: "secondary",
        onClick: onAdd
      })
    }

    if (onEdit) {
      defaultActions.push({
        key: "edit",
        label: "Editar",
        icon: <Edit className="h-4 w-4" />,
        variant: "outline",
        onClick: handleEdit
      })
    }

    if (onDelete) {
      defaultActions.push({
        key: "delete",
        label: "Excluir",
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
            <div className="flex min-w-0 items-start gap-4">
              {icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/35 text-primary">
                  {icon}
                </div>
              )}

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
                      title="Atualizar"
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
