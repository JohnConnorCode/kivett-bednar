import {useState, useCallback} from 'react'

export type ValidationRule = {
  required?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  custom?: (value: string) => string | null
}

export type ValidationRules = {
  [fieldName: string]: ValidationRule
}

export type ValidationErrors = {
  [fieldName: string]: string
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})

  const validate = useCallback(
    (fieldName: string, value: string): string | null => {
      const rule = rules[fieldName]
      if (!rule) return null

      // Required validation
      if (rule.required && !value.trim()) {
        return 'This field is required'
      }

      // If field is empty and not required, skip other validations
      if (!value.trim() && !rule.required) {
        return null
      }

      // Pattern validation (e.g., email, phone)
      if (rule.pattern && !rule.pattern.test(value)) {
        if (fieldName === 'email') {
          return 'Please enter a valid email address'
        }
        if (fieldName === 'zipCode') {
          return 'Please enter a valid ZIP code'
        }
        return 'Invalid format'
      }

      // Min length validation
      if (rule.minLength && value.length < rule.minLength) {
        return `Must be at least ${rule.minLength} characters`
      }

      // Max length validation
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Must be no more than ${rule.maxLength} characters`
      }

      // Custom validation
      if (rule.custom) {
        return rule.custom(value)
      }

      return null
    },
    [rules]
  )

  const validateField = useCallback(
    (fieldName: string, value: string) => {
      const error = validate(fieldName, value)
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error || '',
      }))
      return error
    },
    [validate]
  )

  const validateAll = useCallback(
    (formData: {[key: string]: string}): boolean => {
      const newErrors: ValidationErrors = {}
      let isValid = true

      Object.keys(rules).forEach((fieldName) => {
        const error = validate(fieldName, formData[fieldName] || '')
        if (error) {
          newErrors[fieldName] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      // Mark all fields as touched
      const allTouched = Object.keys(rules).reduce(
        (acc, key) => ({...acc, [key]: true}),
        {}
      )
      setTouched(allTouched)

      return isValid
    },
    [rules, validate]
  )

  const handleBlur = useCallback(
    (fieldName: string, value: string) => {
      setTouched((prev) => ({...prev, [fieldName]: true}))
      validateField(fieldName, value)
    },
    [validateField]
  )

  const handleChange = useCallback(
    (fieldName: string, value: string) => {
      // Only validate if field has been touched
      if (touched[fieldName]) {
        validateField(fieldName, value)
      }
    },
    [touched, validateField]
  )

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => ({...prev, [fieldName]: ''}))
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  return {
    errors,
    touched,
    validateField,
    validateAll,
    handleBlur,
    handleChange,
    clearError,
    clearAllErrors,
  }
}
