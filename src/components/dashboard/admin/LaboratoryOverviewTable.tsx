import { laboratoryOverview } from '../../../data/mockData'
import { StatusBadge } from '../../ui/StatusBadge'
import { TableCard } from '../shared/TableCard'

export function LaboratoryOverviewTable() {
  return (
    <TableCard title="Laboratory Overview" subtitle="Testing activity across all registered laboratories" delayMs={0.26}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="bg-ink-50">
            {['Laboratory', 'Active Tests', 'Pending Reviews', 'Completed', 'Status'].map((col) => (
              <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {laboratoryOverview.map((row) => (
            <tr key={row.lab} className="transition-colors hover:bg-ink-50/70">
              <td className="px-5 py-3.5 text-sm font-medium text-ink-800">{row.lab}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.activeTests}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.pendingReviews}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.completed}</td>
              <td className="px-5 py-3.5">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  )
}
