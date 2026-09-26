import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { notifications } from '../../data/mockData'
import { cn } from '../../lib/utils'

export function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-surface" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-ink-100 bg-surface shadow-popover"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
              <p className="text-sm font-semibold text-ink-900">Notifications</p>
              <span className="text-xs font-medium text-brand-600">{unreadCount} unread</span>
            </div>
            <ul className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.map((n) => (
                <li key={n.id} className="flex items-start gap-2.5 border-b border-ink-50 px-4 py-3 last:border-0 hover:bg-ink-50/70">
                  <span
                    className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.read ? 'bg-ink-200' : 'bg-brand-500')}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-900">{n.title}</p>
                    <p className="truncate text-xs text-ink-400">{n.detail}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-ink-400">{n.timestamp}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
