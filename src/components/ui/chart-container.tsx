import * as React from "react"
import { cn } from "../../lib/utils"

export interface ChartContainerProps {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  emptyMessage?: string
  isEmpty?: boolean
  height?: number | string
  className?: string
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ title, icon, children, emptyMessage = "Nenhum dado disponível", isEmpty = false, height = 400, className }, ref) => {
    return (
      <div ref={ref} className={cn("bg-card rounded-lg border shadow-sm", className)}>
        {title && (
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {icon && <span className="flex items-center">{icon}</span>}
              {title}
            </h3>
          </div>
        )}
        <div
          className="p-6"
          style={{ height: typeof height === "number" ? `${height}px` : height }}
        >
          {isEmpty ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    )
  }
)

ChartContainer.displayName = "ChartContainer"
