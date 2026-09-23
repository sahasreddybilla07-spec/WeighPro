import { motion } from 'framer-motion'
import { complianceSummary } from '../../../data/mockData'

const SEGMENTS = [
  { label: 'PASS', value: complianceSummary.pass, color: '#23845A' },
  { label: 'FAIL', value: complianceSummary.fail, color: '#C94A45' },
  { label: 'CORRECTION REQUIRED', value: complianceSummary.correctionRequired, color: '#C58B2A' },
]

const total = SEGMENTS.reduce((sum, s) => sum + s.value, 0)

export function ComplianceSummaryBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
    >
      <h3 className="text-sm font-semibold text-ink-900">Compliance Summary</h3>
      <p className="mt-0.5 text-xs text-ink-400">Outcomes of your reviewed evaluations</p>

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
