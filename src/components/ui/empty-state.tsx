import * as React from "react"

import { cn } from "../../lib/utils"

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex max-w-sm flex-col items-center justify-center gap-3 px-4 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:h-6 [&_svg]:w-6">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
