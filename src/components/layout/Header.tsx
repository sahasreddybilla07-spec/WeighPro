import { Building2, Menu, Moon, Search, Sun } from 'lucide-react'
import { NotificationPanel } from '../ui/NotificationPanel'
import { ProfileMenu } from '../ui/ProfileMenu'
import { useAuth } from '../../auth/AuthContext'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  title: string
  subtitle?: string
  onMenuClick: () => void
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-ink-200 bg-surface/90 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-ink-900 sm:text-xl">{title}</h1>
          {subtitle && <p className="mt-0.5 hidden truncate text-sm text-ink-500 sm:block">{subtitle}</p>}
        </div>

        <div className="hidden flex-1 max-w-sm items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 transition-colors focus-within:border-cyan-400 focus-within:bg-surface md:flex">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            type="text"
            placeholder="Search evaluations, instruments, reports…"
            className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
          />
        </div>

        {user && (
          <div className="hidden items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 xl:flex">
            <Building2 className="h-4 w-4 shrink-0 text-brand-600" />
            <span className="whitespace-nowrap text-xs font-medium text-ink-600">{user.laboratoryShort}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" strokeWidth={2} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={2} />}
          </button>
          <NotificationPanel />
          <span className="hidden h-6 w-px bg-ink-200 sm:block" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
