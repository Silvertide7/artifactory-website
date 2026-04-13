type Props = {
  curseforgeUrl: string
  modrinthUrl: string
  className?: string
}

const linkClass =
  'flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-500'

export const DownloadLinks = ({ curseforgeUrl, modrinthUrl, className = '' }: Props) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <a
      href={curseforgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      aria-label="Download on CurseForge (opens in a new tab)"
    >
      <img
        src="/curseforge_link.png"
        alt="CurseForge"
        className="h-auto w-40 object-contain"
      />
    </a>
    <a
      href={modrinthUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      aria-label="Download on Modrinth (opens in a new tab)"
    >
      <img
        src="/modrinth_link.png"
        alt="Modrinth"
        className="h-auto w-40 object-contain"
      />
    </a>
  </div>
)
