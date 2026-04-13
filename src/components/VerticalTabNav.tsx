type Tab<T extends string> = {
  id: T
  label: string
}

type Props<T extends string> = {
  tabs: readonly Tab<T>[]
  activeTab: T
  onSelect: (id: T) => void
  className?: string
}

export function VerticalTabNav<T extends string>({
  tabs,
  activeTab,
  onSelect,
  className = '',
}: Props<T>) {
  return (
    <nav
      aria-label="Section navigation"
      className={`sticky top-20 flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          aria-current={activeTab === id ? 'page' : undefined}
          className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
            activeTab === id
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600 dark:hover:text-zinc-100'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
