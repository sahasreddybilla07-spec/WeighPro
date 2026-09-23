import { LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { ROLE_NAV } from '../../auth/roles'
import { cn } from '../../lib/utils'
import { BrandLockup } from '../ui/BrandLockup'

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null
  const navItems = ROLE_NAV[user.role]

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-ink-200 bg-white transition-transform duration-300 ease-out lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 pt-5">
          <BrandLockup size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="px-6 pb-5 pt-3 text-[11px] font-medium uppercase tracking-wider text-ink-400">
          Digital NAWI Testing &amp; Compliance
        </p>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6 scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                  isActive ? 'bg-brand-700 text-white shadow-sm' : 'text-ink-600 font-medium hover:bg-ink-100 hover:text-ink-900',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-cyan-400 transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <item.icon
                    className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-cyan-300' : 'text-ink-400 group-hover:text-ink-600')}
                    strokeWidth={2}
                  />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
              {user.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{user.name}</p>
              <p className="truncate text-xs text-ink-400">
                {user.roleLabel} · {user.laboratoryShort}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-lg p-1.5 text-ink-400 hover:bg-white hover:text-danger-600"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
