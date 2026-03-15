import { Link } from 'react-router-dom'

const mods = [
  {
    path: '/artifactory',
    logo: '/artifactory-logo.png',
    title: '/artifactory-title.png',
    titleAlt: 'Artifactory',
    description:
      'A data-driven attunement system for Minecraft. Bind items to their wielder through configurable requirements, unlock powerful modifications, and create deep progression for any item in the game.',
    tags: ['Forge', 'NeoForge', 'Data-Driven'],
  },
]

export const Home = () => (
  <div className="space-y-10">
    {/* Hero */}
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
        Silvertide's Minecraft Mods
      </h1>
      <p className="mt-3 text-base text-zinc-500">
        Configurable, data-driven mods built for modpack authors and players who want deeper gameplay.
      </p>
    </div>

    {/* Mod grid */}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mods.map((mod) => (
        <Link
          key={mod.path}
          to={mod.path}
          className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
        >
          {/* Logo + title */}
          <div className="mb-4 flex items-center gap-3">
            <img
              src={mod.logo}
              alt={mod.titleAlt}
              className="h-12 w-12 shrink-0 object-contain drop-shadow-sm"
            />
            <img
              src={mod.title}
              alt={mod.titleAlt}
              className="h-7 object-contain object-left"
            />
          </div>

          {/* Description */}
          <p className="flex-1 text-sm leading-relaxed text-zinc-500">
            {mod.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {mod.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900">
            View mod
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  </div>
)
