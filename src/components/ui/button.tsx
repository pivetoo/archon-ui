import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90",
        success: "bg-success/15 text-[hsl(142_60%_32%)] hover:bg-success/25 dark:text-[hsl(142_60%_62%)]",
        error: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        danger: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        warning: "bg-warning/15 text-[hsl(36_90%_36%)] hover:bg-warning/25 dark:text-[hsl(36_90%_62%)]",
        info: "bg-info/15 text-[hsl(204_70%_36%)] hover:bg-info/25 dark:text-[hsl(204_70%_65%)]",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "outline-secondary": "border border-secondary bg-background text-secondary hover:bg-secondary/10",
        "outline-primary": "border border-primary bg-background text-primary hover:bg-primary/10",
        "outline-success": "border border-success bg-background text-success hover:bg-success/10",
        "outline-warning": "border border-warning bg-background text-warning hover:bg-warning/10",
        "outline-danger": "border border-destructive bg-background text-destructive hover:bg-destructive/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        text: "hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-foreground text-background shadow hover:bg-foreground/90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  tooltip?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, fullWidth = false, icon, iconPosition = "left", tooltip, children, disabled, "aria-label": ariaLabel, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    const content = asChild ? children : (
      <>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </span>
        )}
        <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      </>
    )

    const button = (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full",
          loading && "relative"
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-label={ariaLabel ?? tooltip}
        {...props}
      >
        {content}
      </Comp>
    )

    if (!tooltip) {
      return button
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
