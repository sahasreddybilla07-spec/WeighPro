import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, FlaskConical } from 'lucide-react'
import { instrumentStatusSummary } from '../../../data/mockData'

const ITEMS = [
  { label: 'Active', value: instrumentStatusSummary.active, icon: CheckCircle2, tone: 'text-success-600 bg-success-50' },
  { label: 'Under Testing', value: instrumentStatusSummary.underTesting, icon: FlaskConical, tone: 'text-info-600 bg-info-50' },
  { label: 'Due for Verification', value: instrumentStatusSummary.dueForVerification, icon: AlertTriangle, tone: 'text-warning-600 bg-warning-50' },
]

export function InstrumentStatusStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-3 px-5 py-4">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.tone}`}>
            <item.icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <div>
            <p className="font-mono text-lg font-semibold tabular-nums text-ink-900">{item.value}</p>
            <p className="text-xs text-ink-500">{item.label} Instruments</p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
