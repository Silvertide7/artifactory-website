import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

type SectionHeaderProps = {
  title: ReactNode
  action?: ReactNode
}

export const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <div
    className={cn(
      'border-b border-zinc-100 px-5 py-3 dark:border-zinc-600',
      action ? 'flex items-center justify-between' : undefined,
    )}
  >
    <h2 className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
      {title}
    </h2>
    {action}
  </div>
)
