import * as React from "react"

import { cn } from "../../lib/utils"

export interface FormFieldProps {
  label?: React.ReactNode
  htmlFor?: string
  required?: boolean
  error?: string
  helperText?: string
  className?: string
  children: React.ReactNode
}

const FormField = ({ label, htmlFor, required, error, helperText, className, children }: FormFieldProps) => {
  const generatedId = React.useId()
  const fieldId = htmlFor ?? generatedId
  const message = error ?? helperText
  const messageId = message ? `${fieldId}-message` : undefined

  const control = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        id: (children.props as Record<string, unknown>).id ?? fieldId,
        "aria-invalid": error ? true : (children.props as Record<string, unknown>)["aria-invalid"],
        "aria-describedby": [(children.props as Record<string, unknown>)["aria-describedby"], messageId].filter(Boolean).join(" ") || undefined,
      })
    : children

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </label>
      )}
      {control}
      {message && (
        <p id={messageId} className={cn(
          "text-xs",
          error ? "text-destructive" : "text-muted-foreground"
        )}>
          {message}
        </p>
      )}
    </div>
  )
}
FormField.displayName = "FormField"

export { FormField }
