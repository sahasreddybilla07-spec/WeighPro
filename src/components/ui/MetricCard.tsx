import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { cn, formatNumber } from '../../lib/utils'

type Tone = 'brand' | 'cyan' | 'info' | 'warning' | 'success' | 'danger'

const ICON_TONE: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  info: 'bg-info-50 text-info-600',
  warning: 'bg-warning-50 text-warning-600',
  success: 'bg-success-50 text-success-600',
  danger: 'bg-danger-50 text-danger-600',
}

const ACCENT_TONE: Record<Tone, string> = {
  brand: 'bg-brand-600',
  cyan: 'bg-cyan-500',
  info: 'bg-info-500',
  warning: 'bg-warning-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
}

const RING_TONE: Record<Tone, string> = {
  brand: 'border-brand-100',
  cyan: 'border-cyan-100',
  info: 'border-info-100',
  warning: 'border-warning-100',
  success: 'border-success-100',
  danger: 'border-danger-100',
}

interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  tone: Tone
  context: string
  delayMs?: number
}

export function MetricCard({ title, value, icon: Icon, tone, context, delayMs = 0 }: MetricCardProps) {
  const animatedValue = useCountUp(value, 1100, delayMs)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-raised"
    >
      {/* Faint gauge-bezel ring: a quiet dial motif tucked behind the icon */}
      <span
        className={cn('pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full border-[6px]', RING_TONE[tone])}
        aria-hidden="true"
      />
      <span className={cn('absolute inset-x-0 top-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100', ACCENT_TONE[tone])} />

      <div className="relative flex items-start justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', ICON_TONE[tone])}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
      <p className="relative mt-4 text-sm font-medium text-ink-500">{title}</p>
      <p className="relative mt-1 font-mono text-[27px] font-semibold leading-none tracking-tight text-ink-900 tabular-nums">
        {formatNumber(animatedValue)}
      </p>
      <p className="relative mt-2 text-xs text-ink-400">{context}</p>
    </motion.div>
  )
}
