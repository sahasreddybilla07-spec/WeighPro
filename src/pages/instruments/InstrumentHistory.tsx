import { FileText, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allEvaluations } from '../../data/mockData'
import { TableCard } from '../../components/dashboard/shared/TableCard'
import { StatusBadge } from '../../components/ui/StatusBadge'

export function InstrumentHistory() {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const sorted = [...allEvaluations].sort((a, b) => b.id.localeCompare(a.id))
    if (!query) return sorted
    return sorted.filter(
      (e) =>
        e.id.toLowerCase().includes(query.toLowerCase()) ||
        e.instrumentSerial.toLowerCase().includes(query.toLowerCase()) ||
        e.manufacturer.toLowerCase().includes(query.toLowerCase()) ||
        e.model.toLowerCase().includes(query.toLowerCase()) ||
        e.tester.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 sm:max-w-sm">
        <Search className="h-4 w-4 shrink-0 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by evaluation, instrument or tester…"
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>

      <TableCard title="Instrument History" subtitle={`${rows.length} evaluation records`}>
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Evaluation ID', 'Instrument', 'Date', 'Testing Technician', 'Legal Reviewer', 'Status', 'Result', 'Report'].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((e) => (
              <tr key={e.id} className="transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{e.id}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.manufacturer} {e.model}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{e.createdDate}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.tester}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.reviewer}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.result} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  {e.status === 'Approved' || e.status === 'Completed' ? (
                    <Link to={`/reports/${e.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
                      <FileText className="h-3.5 w-3.5" /> View
                    </Link>
                  ) : (
                    <span className="text-xs text-ink-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
