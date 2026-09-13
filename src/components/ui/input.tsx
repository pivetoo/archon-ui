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
            // bg-card em vez de bg-background: o cinza da pagina fazia o campo parecer desabilitado dentro de card e modal.
            "flex h-9 w-full min-w-0 rounded-md border border-input bg-card px-3 py-1 text-base text-foreground transition-[color,border-color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/75 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input md:text-sm [&::-webkit-date-and-time-value]:text-left [&::-webkit-calendar-picker-indicator]:ml-auto [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden",
            error && "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/15",
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
