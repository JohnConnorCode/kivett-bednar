import {Check, AlertCircle} from 'lucide-react'

type FormFieldProps = {
  label: string
  name: string
  value: string
  type?: 'text' | 'email' | 'tel' | 'password'
  required?: boolean
  placeholder?: string
  error?: string
  touched?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  autoComplete?: string
}

export function FormField({
  label,
  name,
  value,
  type = 'text',
  required = false,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
  className = '',
  autoComplete,
}: FormFieldProps) {
  const hasError = touched && error
  const isValid = touched && !error && value.trim().length > 0

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3"
      >
        {label} {required && <span className="text-accent-red">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-background border px-4 py-3 text-text-primary focus:outline-none transition-all pr-12 ${
            hasError
              ? 'border-accent-red focus:border-accent-red'
              : isValid
              ? 'border-green-500 focus:border-green-500'
              : 'border-border focus:border-accent-primary'
          }`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {/* Success/Error Icon */}
        {touched && value.trim().length > 0 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {isValid ? (
              <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
            ) : hasError ? (
              <AlertCircle className="w-5 h-5 text-accent-red" aria-hidden="true" />
            ) : null}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div
          id={`${name}-error`}
          className="mt-2 flex items-start gap-2 text-accent-red text-sm animate-slide-in-down"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div className="mt-2 flex items-center gap-2 text-green-500 text-sm animate-slide-in-down">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Looks good!</span>
        </div>
      )}
    </div>
  )
}
