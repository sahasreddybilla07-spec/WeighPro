import { testerWorkload } from '../../../data/mockData'
import { TableCard } from '../shared/TableCard'

export function TesterWorkloadTable() {
  return (
    <TableCard title="Testing Technician Workload" subtitle="Current assignment load across the testing team" delayMs={0.26}>
      <table className="w-full min-w-[440px] border-collapse text-left">
        <thead>
          <tr className="bg-ink-50">
            {['Testing Technician', 'Assigned', 'In Progress', 'Completed'].map((col) => (
              <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {testerWorkload.map((row) => (
            <tr key={row.tester} className="transition-colors hover:bg-ink-50/70">
              <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-800">{row.tester}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.assigned}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.inProgress}</td>
              <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-700">{row.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  )
}
