import { Link } from 'react-router-dom'

const tools = [
  {
    path: '/artifactory/json-builder',
    label: 'JSON Builder',
    description: 'Generate attunement data source config files with a guided form. Fill in fields, validate, then copy or download the JSON directly into your datapack.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2" />
        <path d="M8 4a2 2 0 0 1 4 0v1H8V4Z" />
        <path d="M7 10h6M7 13h4" />
      </svg>
    ),
  },
]

export const Artifactory = () => (
  <div className="space-y-10">
    {/* Header */}
    <div className="flex items-center gap-5">
      <img
        src="/artifactory-logo.png"
        alt="Artifactory Nexus"
        className="h-20 w-20 shrink-0 object-contain drop-shadow-md"
      />
      <div>
        <img
          src="/artifactory-title.png"
          alt="Artifactory"
          className="h-10 object-contain object-left"
        />
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
          A data-driven attunement system for Minecraft. Bind items to their wielder through
          configurable requirements, unlock powerful modifications, and create deep progression
          for any item in the game.
        </p>
      </div>
    </div>

    {/* Tools */}
    <div>
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Tools
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-900 group-hover:text-white">
                {tool.icon}
              </span>
              <span className="text-sm font-semibold text-zinc-800">{tool.label}</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">{tool.description}</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-medium text-zinc-500 transition group-hover:text-zinc-800">
              Open tool
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)
