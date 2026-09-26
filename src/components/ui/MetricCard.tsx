import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { cn, formatNumber } from '../../lib/utils'

type Tone = 'brand' | 'cyan' | 'info' | 'warning' | 'success' | 'danger'

const ICON_TONE: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-100',
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  info: 'bg-info-50 text-info-600 ring-info-100',
  warning: 'bg-warning-50 text-warning-600 ring-warning-100',
  success: 'bg-success-50 text-success-600 ring-success-100',
  danger: 'bg-danger-50 text-danger-600 ring-danger-100',
}

interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  tone: Tone
  context: string
  suffix?: string
  delayMs?: number
}

export function MetricCard({ title, value, icon: Icon, tone, context, suffix, delayMs = 0 }: MetricCardProps) {
  const animatedValue = useCountUp(value, 1100, delayMs)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-ink-200/80 bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-raised"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-ink-500">{title}</p>
        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset', ICON_TONE[tone])}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-4 font-mono text-[32px] font-medium leading-none tracking-tight text-ink-900 tabular-nums">
        {formatNumber(animatedValue)}
        {suffix && <span className="text-lg">{suffix}</span>}
      </p>
      <p className="mt-2.5 border-t border-ink-100 pt-2.5 text-xs text-ink-500">{context}</p>
    </motion.div>
  )
}
