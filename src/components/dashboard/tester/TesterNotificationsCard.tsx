import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { testerNotifications } from '../../../data/mockData'
import { cn } from '../../../lib/utils'

export function TesterNotificationsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
    >
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-brand-600" strokeWidth={2} />
        <h3 className="text-sm font-semibold text-ink-900">Important Notifications</h3>
      </div>

      <ul className="mt-4 divide-y divide-ink-100">
        {testerNotifications.map((n) => (
          <li key={n.id} className="flex items-start gap-2.5 py-2.5">
            <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.read ? 'bg-ink-200' : 'bg-cyan-500')} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900">{n.title}</p>
              <p className="truncate font-mono text-xs text-ink-400">{n.detail}</p>
            </div>
            <span className="shrink-0 text-[11px] text-ink-400">{n.timestamp}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
