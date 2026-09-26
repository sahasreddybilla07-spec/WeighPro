import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, FilePlus2, FileText, Send, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ActivityItem } from '../../../data/mockData'
import { cn } from '../../../lib/utils'

const TYPE_CONFIG: Record<ActivityItem['type'], { icon: LucideIcon; chip: string; iconColor: string }> = {
  created: { icon: FilePlus2, chip: 'bg-brand-50', iconColor: 'text-brand-600' },
  submitted: { icon: Send, chip: 'bg-cyan-50', iconColor: 'text-cyan-700' },
  assigned: { icon: UserCheck, chip: 'bg-ink-100', iconColor: 'text-ink-600' },
  approved: { icon: CheckCircle2, chip: 'bg-success-50', iconColor: 'text-success-600' },
  correction: { icon: AlertTriangle, chip: 'bg-danger-50', iconColor: 'text-danger-600' },
  report: { icon: FileText, chip: 'bg-warning-50', iconColor: 'text-warning-600' },
}

interface ActivityFeedProps {
  title: string
  subtitle?: string
  items: ActivityItem[]
  maxHeightPx?: number
  delayMs?: number
  className?: string
}

export function ActivityFeed({ title, subtitle, items, maxHeightPx = 420, delayMs = 0, className }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={cn('rounded-2xl border border-ink-200 bg-surface p-5 shadow-card', className)}
    >
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>}

      <ul
        className="relative mt-5 space-y-5 overflow-y-auto pr-1 scrollbar-thin"
        style={{ maxHeight: maxHeightPx }}
      >
        <span className="pointer-events-none absolute bottom-1 left-[15px] top-1 w-px bg-ink-100" aria-hidden="true" />
        {items.map((activity, index) => {
          const config = TYPE_CONFIG[activity.type]
          const Icon = config.icon
          return (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: delayMs / 1000 + 0.05 + index * 0.05 }}
              className="relative flex gap-3"
            >
              <div className={cn('relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-surface', config.chip)}>
                <Icon className={cn('h-4 w-4', config.iconColor)} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 pb-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-ink-900">{activity.title}</p>
                  <span className="shrink-0 text-[11px] text-ink-400">{activity.timestamp}</span>
                </div>
                <p className="mt-0.5 truncate font-mono text-[11px] text-ink-500">{activity.reference}</p>
                <p className="mt-0.5 text-xs text-ink-400">by {activity.actor}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}
