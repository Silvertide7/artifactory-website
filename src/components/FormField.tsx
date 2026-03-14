import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor: string
  error?: string
  hint?: ReactNode
  children: (errorId: string | undefined) => ReactNode
}

export const FormField = ({
  label,
  htmlFor,
  error,
  hint,
  children,
}: FormFieldProps) => {
  const errorId = error ? `${htmlFor}-error` : undefined

  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      {children(errorId)}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-rose-600">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  )
}
