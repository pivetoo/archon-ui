import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, id, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined

    return (
      <div className="w-full">
        <input
          id={inputId}
          type={type}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p id={helperId} className={cn(
            "mt-1 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
