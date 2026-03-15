import type { ReactNode } from 'react'
import { Tooltip } from './Tooltip'

type FormFieldProps = {
  label: string
  htmlFor: string
  error?: string
  hint?: string
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
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-sm font-medium text-zinc-700"
      >
        {label}
        {hint && <Tooltip content={hint} />}
      </label>
      {children(errorId)}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1 text-xs text-rose-500">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}
