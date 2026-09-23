import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

export function ProfileMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!user) return null

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-ink-100"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
          {user.initials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold leading-tight text-ink-900">{user.name}</span>
          <span className="block text-xs leading-tight text-ink-400">{user.roleLabel}</span>
        </span>
        <ChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-popover"
          >
            <div className="border-b border-ink-100 px-4 py-3">
              <p className="text-sm font-semibold text-ink-900">{user.name}</p>
              <p className="mt-0.5 text-xs text-ink-400">{user.laboratory}</p>
            </div>
            <div className="p-1.5">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50"
              >
                <UserRound className="h-4 w-4 text-ink-400" />
                My Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50"
                >
                  <Settings className="h-4 w-4 text-ink-400" />
                  Settings
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-danger-600 hover:bg-danger-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
