import { Circle } from 'lucide-react'
import { cn } from '../../lib/utils'

type BadgeTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'accent'

const STATUS_TONE: Record<string, BadgeTone> = {
  Draft: 'neutral',
  Assigned: 'neutral',
  'In Progress': 'info',
  Testing: 'info',
  Submitted: 'accent',
  'Under Review': 'warning',
  'Correction Required': 'danger',
  Returned: 'danger',
  Approved: 'success',
  Completed: 'success',
  Active: 'success',
  Maintenance: 'warning',
  'Under Testing': 'info',
  'Due for Verification': 'warning',
  Decommissioned: 'neutral',
  Inactive: 'neutral',
  Final: 'success',
  PASS: 'success',
  FAIL: 'danger',
  PENDING: 'neutral',
  'NOT TESTED': 'neutral',
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: 'bg-success-50 text-success-700 ring-success-100',
  danger: 'bg-danger-50 text-danger-700 ring-danger-100',
  warning: 'bg-warning-50 text-warning-700 ring-warning-100',
  info: 'bg-info-50 text-info-600 ring-info-100',
  accent: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  neutral: 'bg-ink-100 text-ink-600 ring-ink-200',
}

const DOT_CLASSES: Record<BadgeTone, string> = {
  success: 'fill-success-500 text-success-500',
  danger: 'fill-danger-500 text-danger-500',
  warning: 'fill-warning-500 text-warning-500',
  info: 'fill-info-500 text-info-500',
  accent: 'fill-cyan-500 text-cyan-500',
  neutral: 'fill-ink-400 text-ink-400',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const tone = STATUS_TONE[status] ?? 'neutral'
  const LABEL_OVERRIDE: Record<string, string> = { PENDING: 'Pending', 'NOT TESTED': 'Not Tested' }
  const label = LABEL_OVERRIDE[status] ?? status

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset whitespace-nowrap transition-colors duration-150',
        TONE_CLASSES[tone],
        className,
      )}
    >
      <Circle className={cn('h-1.5 w-1.5', DOT_CLASSES[tone])} strokeWidth={0} />
      {label}
    </span>
  )
}
