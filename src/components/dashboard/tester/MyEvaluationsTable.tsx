import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { myEvaluations } from '../../../data/mockData'
import { StatusBadge } from '../../ui/StatusBadge'
import { TableCard } from '../shared/TableCard'

const ACTION_LABEL: Record<string, string> = {
  Assigned: 'Start',
  Testing: 'Continue',
  Draft: 'Submit',
  'Correction Required': 'Resubmit',
  Approved: 'View',
}

export function MyEvaluationsTable() {
  return (
    <TableCard title="My Evaluations" subtitle="Everything assigned to you, in progress or awaiting action" delayMs={0.2}>
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead>
          <tr className="bg-ink-50">
            {['Evaluation ID', 'Instrument', 'Progress', 'Status', ''].map((col) => (
              <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {myEvaluations.map((row) => (
            <tr key={row.evaluationId} className="group transition-colors hover:bg-ink-50/70">
              <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{row.evaluationId}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{row.instrument}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: `${Math.round(row.progressFraction * 100)}%` }}
                    />
                  </div>
                  <span className="whitespace-nowrap font-mono text-xs text-ink-500">{row.progress}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <StatusBadge status={row.status} />
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-right">
                <Link
                  to={`/evaluations/${row.evaluationId}`}
                  className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-ink-100 hover:text-ink-800"
                >
                  {ACTION_LABEL[row.status] ?? 'View'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  )
}
