type TooltipProps = {
  content: string
}

export const Tooltip = ({ content }: TooltipProps) => (
  <span className="group relative inline-flex items-center">
    <button
      type="button"
      aria-label={`Info: ${content}`}
      title={content}
      className="flex h-4 w-4 cursor-help select-none items-center justify-center rounded-full text-[10px] font-bold text-zinc-400 ring-1 ring-zinc-300 transition hover:text-zinc-600 hover:ring-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-400 dark:ring-zinc-600 dark:hover:text-zinc-300 dark:hover:ring-zinc-500"
    >
      i
    </button>
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-72 -translate-x-1/2 break-all whitespace-pre-line rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs leading-relaxed text-slate-100 shadow-2xl opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {content}
      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-900" />
    </span>
  </span>
)
