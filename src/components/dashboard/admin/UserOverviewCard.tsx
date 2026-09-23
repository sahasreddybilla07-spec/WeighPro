import { motion } from 'framer-motion'
import { ClipboardList, ShieldCheck, UserCog, Users } from 'lucide-react'
import { userOverview } from '../../../data/mockData'

const ROWS = [
  { label: 'Testers', value: userOverview.testers, icon: ClipboardList },
  { label: 'Reviewers', value: userOverview.reviewers, icon: ShieldCheck },
  { label: 'Lab Managers', value: userOverview.labManagers, icon: UserCog },
]

export function UserOverviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
    >
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-brand-600" strokeWidth={2} />
        <h3 className="text-sm font-semibold text-ink-900">User Overview</h3>
      </div>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink-900">{userOverview.activeUsers}</p>
      <p className="text-xs text-ink-400">Active users across the platform</p>

      <ul className="mt-4 divide-y divide-ink-100 border-t border-ink-100">
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2 text-sm text-ink-600">
              <row.icon className="h-4 w-4 text-ink-400" strokeWidth={2} />
              {row.label}
            </span>
            <span className="font-mono text-sm font-semibold tabular-nums text-ink-900">{row.value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
