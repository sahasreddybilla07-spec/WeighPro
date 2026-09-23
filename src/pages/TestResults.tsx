import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allEvaluations } from '../data/mockData'
import { TableCard } from '../components/dashboard/shared/TableCard'
import { StatusBadge } from '../components/ui/StatusBadge'

export function TestResults() {
  const rows = [...allEvaluations].sort((a, b) => b.id.localeCompare(a.id))

  return (
    <div className="space-y-5">
      <TableCard title="Test Results" subtitle="Overall compliance result for every evaluation">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Evaluation ID', 'Instrument', 'Tests Completed', 'Date', 'Overall Result', 'Status', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((e) => (
              <tr key={e.id} className="group transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{e.id}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.manufacturer} {e.model}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-sm text-ink-600">{e.testsCompleted} / {e.testsTotal}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{e.createdDate}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.result} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right">
                  <Link
                    to={`/evaluations/${e.id}`}
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-ink-100 hover:text-ink-800"
                  >
                    View
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
