type TooltipProps = {
  content: string
}

export const Tooltip = ({ content }: TooltipProps) => (
  <span className="group relative inline-flex items-center">
    <button
      type="button"
      aria-label={`Info: ${content}`}
      title={content}
      onClick={(e) => e.preventDefault()}
      className="flex h-4 w-4 cursor-help select-none items-center justify-center rounded-full text-[10px] font-bold text-slate-400 ring-1 ring-slate-300 transition hover:text-slate-600 hover:ring-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-400"
    >
      i
    </button>
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl bg-slate-800 px-3.5 py-2.5 text-xs leading-relaxed text-slate-100 shadow-2xl opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {content}
      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800" />
    </span>
  </span>
)
