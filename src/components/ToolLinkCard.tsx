import { Link } from 'react-router-dom'

type Props = {
  to: string
  icon: React.ReactNode
  title: string
  description: string
  label?: string
}

export const ToolLinkCard = ({ to, icon, title, description, label = 'Open tool' }: Props) => (
  <Link
    to={to}
    className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-600 dark:text-zinc-300 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
    <div className="flex items-center gap-1 text-xs font-medium text-zinc-500 transition group-hover:text-zinc-800 dark:group-hover:text-zinc-100">
      {label}
      <svg
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </div>
  </Link>
)
