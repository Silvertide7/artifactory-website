import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
  }
>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:outline-zinc-400',
  secondary:
    'bg-white text-zinc-700 ring-1 ring-zinc-300 hover:bg-zinc-50 hover:ring-zinc-400 focus-visible:outline-zinc-400 dark:bg-zinc-700 dark:text-zinc-200 dark:ring-zinc-600 dark:hover:bg-zinc-600 dark:hover:ring-zinc-500',
  ghost:
    'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200',
  danger:
    'text-rose-600 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-rose-400 dark:text-rose-400 dark:hover:bg-rose-950 dark:hover:text-rose-300',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
