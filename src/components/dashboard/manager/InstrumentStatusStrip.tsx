import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, FlaskConical } from 'lucide-react'
import { useAppData } from '../../../context/AppDataContext'

export function InstrumentStatusStrip() {
  const { data } = useAppData()
  const items = [
    { label: 'Active', value: data.instruments.filter((i) => i.status === 'Active').length, icon: CheckCircle2, tone: 'text-success-600 bg-success-50' },
    { label: 'Under Testing', value: data.instruments.filter((i) => i.status === 'Under Testing').length, icon: FlaskConical, tone: 'text-info-600 bg-info-50' },
    { label: 'Due for Verification', value: data.instruments.filter((i) => i.status === 'Due for Verification').length, icon: AlertTriangle, tone: 'text-warning-600 bg-warning-50' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-surface shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {items.map((item) => (
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
