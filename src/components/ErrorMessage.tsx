type ErrorMessageProps = {
  id?: string
  message: string
}

export const ErrorMessage = ({ id, message }: ErrorMessageProps) => (
  <p id={id} role="alert" className="flex items-center gap-1 text-xs text-rose-500">
    <span aria-hidden="true">⚠</span>
    {message}
  </p>
)
