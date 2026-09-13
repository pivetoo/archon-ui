import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        // Textos escuros das variantes suaves e de contorno: luminosidade escolhida para passar 4.5:1 sobre branco e sobre o fundo suave.
        success: "bg-success/15 text-[hsl(142_60%_30%)] hover:bg-success/25 dark:text-[hsl(142_60%_62%)]",
        error: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        danger: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        warning: "bg-warning/15 text-[hsl(36_90%_31%)] hover:bg-warning/25 dark:text-[hsl(36_90%_62%)]",
        info: "bg-info/15 text-[hsl(204_70%_36%)] hover:bg-info/25 dark:text-[hsl(204_70%_65%)]",
        // bg-card nos contornos: bg-background era o cinza da pagina e o botao parecia apagado sobre card e modal.
        outline: "border border-input bg-card text-foreground hover:border-muted-foreground/50 hover:bg-accent hover:text-accent-foreground",
        "outline-secondary": "border border-secondary bg-card text-[hsl(186_100%_26%)] hover:bg-secondary/10 dark:text-secondary",
        "outline-primary": "border border-primary bg-card text-primary hover:bg-primary/10",
        "outline-success": "border border-success bg-card text-[hsl(142_60%_30%)] hover:bg-success/10 dark:text-success",
        "outline-warning": "border border-warning bg-card text-[hsl(36_90%_31%)] hover:bg-warning/10 dark:text-warning",
        "outline-danger": "border border-destructive bg-card text-destructive hover:bg-destructive/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        text: "hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-foreground text-background shadow-sm hover:bg-foreground/90",
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
