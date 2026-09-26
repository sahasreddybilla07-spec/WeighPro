import { BookOpenCheck, ExternalLink, LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { ROLE_NAV } from '../../auth/roles'
import { cn } from '../../lib/utils'
import { BrandLockup } from '../ui/BrandLockup'

const OIML_R76_URL = 'https://www.oiml.org/en/files/pdf_r/r076-1-e06.pdf'

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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-white/[0.08] bg-[#14283a] text-white transition-transform duration-300 ease-out lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 pt-5">
          <BrandLockup size="sm" light />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/55 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="px-6 pb-6 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
          Metrology operations
        </p>

        <nav aria-label="Main navigation" className="flex-1 space-y-1 overflow-y-auto px-3 pb-6 scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors',
                  isActive ? 'bg-white/[0.12] text-white shadow-sm ring-1 ring-inset ring-white/[0.08]' : 'text-white/65 hover:bg-white/[0.07] hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'absolute inset-y-2 left-0 w-[2px] rounded-r-full bg-[#8cc9bd] transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <item.icon
                    className={cn('h-[17px] w-[17px] shrink-0', isActive ? 'text-[#a9d8cc]' : 'text-white/45 group-hover:text-white/80')}
                    strokeWidth={1.8}
                  />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {user.role === 'admin' && (
          <div className="border-t border-white/[0.08] px-3 py-3">
            <a
              href={OIML_R76_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <BookOpenCheck className="h-[17px] w-[17px] shrink-0 text-white/45 group-hover:text-white/80" strokeWidth={1.8} />
              <span className="truncate">OIML Rules</span>
              <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-white/35 group-hover:text-white/70" strokeWidth={1.8} />
            </a>
          </div>
        )}

        <div className="border-t border-white/[0.08] p-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#dcebe7] text-xs font-bold text-[#173345]">
              {user.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-[11px] text-white/50">
                {user.roleLabel} · {user.laboratoryShort}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-lg p-1.5 text-white/45 hover:bg-white/10 hover:text-white"
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
