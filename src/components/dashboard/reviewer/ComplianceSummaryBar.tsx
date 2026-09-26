import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { complianceSummary } from '../../../data/mockData'

// Mirrors the success/danger/warning "500" step from src/index.css so this
// hand-colored bar stays in sync with the rest of the semantic palette.
const SEGMENT_COLORS = {
  light: { pass: '#23845A', fail: '#C94A45', correctionRequired: '#C58B2A' },
  dark: { pass: '#3FC088', fail: '#F0655C', correctionRequired: '#E3A83D' },
}

const total = complianceSummary.pass + complianceSummary.fail + complianceSummary.correctionRequired

interface ComplianceSummaryBarProps {
  title?: string
  subtitle?: string
  action?: ReactNode
}

export function ComplianceSummaryBar({
  title = 'Compliance Summary',
  subtitle = 'Outcomes of your reviewed evaluations',
  action,
}: ComplianceSummaryBarProps) {
  const { theme } = useTheme()
  const colors = SEGMENT_COLORS[theme]
  const SEGMENTS = [
    { label: 'PASS', value: complianceSummary.pass, color: colors.pass },
    { label: 'FAIL', value: complianceSummary.fail, color: colors.fail },
    { label: 'CORRECTION REQUIRED', value: complianceSummary.correctionRequired, color: colors.correctionRequired },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-surface p-5 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>
        </div>
        {action}
      </div>

      <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
        {SEGMENTS.map((segment) => (
          <div
            key={segment.label}
            className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
            style={{ width: `${(segment.value / total) * 100}%`, backgroundColor: segment.color }}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {SEGMENTS.map((segment) => (
          <div key={segment.label}>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{segment.label}</span>
            </div>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink-900">{segment.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
