import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

interface TableCardProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  delayMs?: number
  className?: string
}

export function TableCard({ title, subtitle, action, children, delayMs = 0, className }: TableCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={cn('rounded-2xl border border-ink-200 bg-surface shadow-card', className)}
    >
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="overflow-x-auto scrollbar-thin">{children}</div>
    </motion.div>
  )
}
