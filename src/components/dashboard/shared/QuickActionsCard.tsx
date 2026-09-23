import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface QuickAction {
  label: string
  description: string
  icon: LucideIcon
  to: string
}

interface QuickActionsCardProps {
  actions: QuickAction[]
  delayMs?: number
}

export function QuickActionsCard({ actions, delayMs = 0.1 }: QuickActionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
    >
      <h3 className="text-sm font-semibold text-ink-900">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="group flex flex-col gap-2.5 rounded-xl border border-ink-200 bg-ink-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:shadow-raised"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-700 ring-1 ring-ink-200 transition-colors group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700">
              <action.icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">{action.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-400">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
