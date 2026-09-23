import { ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pendingReviewQueue } from '../../../data/mockData'
import { StatusBadge } from '../../ui/StatusBadge'
import { TableCard } from './TableCard'

interface PendingReviewTableProps {
  title: string
  subtitle: string
  limit?: number
  viewAllTo?: string
  delayMs?: number
}

export function PendingReviewTable({ title, subtitle, limit, viewAllTo, delayMs = 0.2 }: PendingReviewTableProps) {
  const rows = limit ? pendingReviewQueue.slice(0, limit) : pendingReviewQueue

  return (
    <TableCard
      title={title}
      subtitle={subtitle}
      delayMs={delayMs}
      action={
        viewAllTo && (
          <Link to={viewAllTo} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )
      }
    >
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="bg-ink-50">
            {['Evaluation ID', 'Instrument', 'Tester', 'Submitted', 'Result', ''].map((col) => (
              <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {rows.map((row) => (
            <tr key={row.evaluationId} className="group transition-colors hover:bg-ink-50/70">
              <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{row.evaluationId}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{row.instrument}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{row.tester}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{row.submitted}</td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <StatusBadge status={row.result} />
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-right">
                <Link
                  to={`/evaluations/${row.evaluationId}`}
                  className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-ink-100 hover:text-ink-800"
                >
                  Review
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
