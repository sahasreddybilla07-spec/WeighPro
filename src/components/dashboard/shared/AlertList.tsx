import { motion } from 'framer-motion'
import { AlertTriangle, ClipboardX, Clock, FileCheck2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AlertItem } from '../../../data/mockData'
import { cn } from '../../../lib/utils'

const KIND_ICON: Record<AlertItem['kind'], LucideIcon> = {
  correction: AlertTriangle,
  review: Clock,
  report: FileCheck2,
  data: ClipboardX,
}

const URGENCY_STYLES: Record<AlertItem['urgency'], { rail: string; chip: string; icon: string; label: string; text: string }> = {
  overdue: { rail: 'bg-danger-500', chip: 'bg-danger-50', icon: 'text-danger-600', label: 'Overdue', text: 'text-danger-600' },
  'due-today': { rail: 'bg-warning-500', chip: 'bg-warning-50', icon: 'text-warning-600', label: 'Due today', text: 'text-warning-600' },
  attention: { rail: 'bg-info-500', chip: 'bg-info-50', icon: 'text-info-600', label: 'Needs attention', text: 'text-info-600' },
}

interface AlertListProps {
  title: string
  items: AlertItem[]
  delayMs?: number
  className?: string
}

export function AlertList({ title, items, delayMs = 0, className }: AlertListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={cn('rounded-2xl border border-ink-200 bg-white shadow-card', className)}
    >
      <div className="flex items-center gap-2 border-b border-ink-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-[11px] font-bold text-white">
          {items.length}
        </span>
      </div>

      <ul className="divide-y divide-ink-100">
        {items.map((item, index) => {
          const Icon = KIND_ICON[item.kind]
          const style = URGENCY_STYLES[item.urgency]
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: delayMs / 1000 + 0.1 + index * 0.05 }}
              className="relative flex items-start gap-3 px-5 py-3.5"
            >
              <span className={cn('absolute inset-y-0 left-0 w-1 rounded-r', style.rail)} />
              <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', style.chip)}>
                <Icon className={cn('h-4 w-4', style.icon)} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink-900">{item.title}</p>
                  <span className={cn('text-[11px] font-semibold uppercase tracking-wide', style.text)}>{style.label}</span>
                </div>
                <p className="mt-0.5 text-xs text-ink-500">{item.description}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}
