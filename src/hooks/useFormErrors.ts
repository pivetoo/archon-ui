import * as React from "react"
import type { ApiError } from "../services/http/types"

export const useFormErrors = () => {
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({})

  const setErrors = (error: ApiError) => {
    if (error.errors) {
      const errors: Record<string, string> = {}
      Object.keys(error.errors).forEach((key) => {
        const fieldKey = key.charAt(0).toLowerCase() + key.slice(1)
        errors[fieldKey] = error.errors![key][0]
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
