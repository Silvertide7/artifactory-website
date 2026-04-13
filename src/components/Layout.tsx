import { Outlet } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'
import { ModNav } from './ModNav'
import { useTheme } from '../hooks/useTheme'

export const Layout = () => {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800">
      <ModNav />
      {/* Theme toggle: fixed so it's always reachable without a full header bar */}
      <button
        type="button"
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
      >
        {theme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:pl-60">
        <Breadcrumb />
        <Outlet />
      </main>
    </div>
  )
}
