import * as React from "react"
import type { ApiError } from "../services/http/types"

export const useFormErrors = () => {
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({})

  const setErrors = (error: ApiError) => {
    if (error.errors && typeof error.errors === "object" && !Array.isArray(error.errors)) {
      const validationErrors = error.errors as Record<string, string[]>
      const errors: Record<string, string> = {}
      Object.keys(validationErrors).forEach((key) => {
        const fieldKey = key.charAt(0).toLowerCase() + key.slice(1)
        errors[fieldKey] = validationErrors[key]?.[0] ?? ""
      })
      setFieldErrors(errors)
    }
  }

  const clearErrors = () => {
    setFieldErrors({})
  }

  const getError = (field: string): string => {
    return fieldErrors[field] || ""
  }

  return {
    fieldErrors,
    setErrors,
    clearErrors,
    getError,
  }
}
