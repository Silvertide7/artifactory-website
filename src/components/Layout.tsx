import { Link, Outlet } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'

export const Layout = () => (
  <div className="min-h-screen bg-zinc-100">
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link
          to="/"
          className="text-sm font-semibold text-zinc-800 transition hover:text-zinc-600"
        >
          Silvertide's Mods
        </Link>
        <Breadcrumb />
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <Outlet />
    </main>
  </div>
)
