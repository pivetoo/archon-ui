import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        error: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        outline: "text-foreground",
        // Suaves: fundo claro e texto na cor do status. Mesmos tons das variantes suaves do Button.
        "soft-default": "border-transparent bg-primary/10 font-medium text-primary dark:text-[hsl(214_60%_72%)]",
        "soft-secondary": "border-transparent bg-secondary/15 font-medium text-[hsl(186_100%_26%)] dark:text-[hsl(186_75%_65%)]",
        "soft-success": "border-transparent bg-success/15 font-medium text-[hsl(142_60%_30%)] dark:text-[hsl(142_60%_62%)]",
        "soft-warning": "border-transparent bg-warning/15 font-medium text-[hsl(36_90%_34%)] dark:text-[hsl(36_90%_62%)]",
        "soft-info": "border-transparent bg-info/15 font-medium text-[hsl(204_70%_36%)] dark:text-[hsl(204_70%_65%)]",
        "soft-destructive": "border-transparent bg-destructive/12 font-medium text-[hsl(0_65%_45%)] dark:text-[hsl(0_72%_68%)]",
        "soft-neutral": "border-transparent bg-muted-foreground/12 font-medium text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  // Bolinha na cor do texto antes do rotulo, para status.
  dot?: boolean
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), dot && "gap-1.5", className)} {...props}>
      {dot && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
