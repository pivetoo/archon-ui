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
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
Textarea.displayName = "Textarea"

export { Textarea }
