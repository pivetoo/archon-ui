import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, ...props }, ref) => {
    if (items.length === 0) return null

    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-2 text-sm", className)}
        aria-label="Breadcrumb"
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span
              className={cn(
                "font-medium transition-colors",
                index === 0 && "text-primary",
                index === 1 && "text-secondary",
                index === items.length - 1
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground",
                item.onClick && "cursor-pointer hover:text-primary"
              )}
              onClick={item.onClick}
            >
              {item.label}
            </span>
            {index < items.length - 1 && (
              <span className="text-border flex items-center select-none">
                {separator || <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
