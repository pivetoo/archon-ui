import * as React from "react"

import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, id, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
    const helperId = helperText ? `${textareaId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined

    return (
      <div className="w-full">
        <textarea
          id={textareaId}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground transition-[color,border-color,box-shadow] placeholder:text-muted-foreground/80 hover:border-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input md:text-sm",
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
Textarea.displayName = "Textarea"

export { Textarea }
