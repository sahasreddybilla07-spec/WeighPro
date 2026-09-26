import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useAppData } from '../../../context/AppDataContext'

// Mirrors the success/danger/warning "500" step from src/index.css so this
// hand-colored bar stays in sync with the rest of the semantic palette.
const SEGMENT_COLORS = {
  light: { pass: '#16864E', fail: '#D74752', correctionRequired: '#D88A0B' },
  dark: { pass: '#50D794', fail: '#FF7B7F', correctionRequired: '#F2BB45' },
}

interface ComplianceSummaryBarProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  summary?: { pass: number; fail: number; correctionRequired: number }
}

export function ComplianceSummaryBar({
  title = 'Compliance Summary',
  subtitle = 'Outcomes of your reviewed evaluations',
  action,
  summary,
}: ComplianceSummaryBarProps) {
  const { theme } = useTheme()
  const { data } = useAppData()
  const colors = SEGMENT_COLORS[theme]
  const evaluated = data.evaluations.filter((row) => row.result === 'PASS' || row.result === 'FAIL')
  const counts = summary ?? {
    pass: evaluated.filter((row) => row.result === 'PASS').length,
    fail: evaluated.filter((row) => row.result === 'FAIL').length,
    correctionRequired: data.evaluations.filter((row) => row.status === 'Correction Required').length,
  }
  const SEGMENTS = [
    { label: 'PASS', value: counts.pass, color: colors.pass },
    { label: 'FAIL', value: counts.fail, color: colors.fail },
    { label: 'CORRECTION REQUIRED', value: counts.correctionRequired, color: colors.correctionRequired },
  ]
  const total = SEGMENTS.reduce((sum, segment) => sum + segment.value, 0) || 1

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
