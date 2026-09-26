import { Download, Eye, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { reportsList } from '../data/mockData'
import { SelectInput } from '../components/ui/FormSection'
import { StatusBadge } from '../components/ui/StatusBadge'
import { TableCard } from '../components/dashboard/shared/TableCard'

export function ReportsRepository() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('All Results')

  const rows = useMemo(() => {
    return reportsList
      .filter((r) => result === 'All Results' || r.result === result)
      .filter(
        (r) =>
          !query ||
          r.reportId.toLowerCase().includes(query.toLowerCase()) ||
          r.instrument.toLowerCase().includes(query.toLowerCase()) ||
          r.serial.toLowerCase().includes(query.toLowerCase()),
      )
  }, [query, result])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by report ID, instrument, serial…"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <SelectInput value={result} onChange={(e) => setResult(e.target.value)} className="w-auto">
          {['All Results', 'PASS', 'FAIL'].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </SelectInput>
      </div>

      <TableCard title="Reports Repository" subtitle={`${rows.length} of ${reportsList.length} reports`}>
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Report ID', 'Instrument', 'Serial', 'Evaluation', 'Date', 'Result', 'Legal Reviewer', 'Status', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((r) => (
              <tr key={r.reportId} className="transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{r.reportId}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{r.instrument}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{r.serial}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{r.evaluationId}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{r.date}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={r.result} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{r.reviewer}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={r.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <div className="flex justify-end gap-1">
                    <Link to={`/reports/${r.evaluationId}`} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700" title="View">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link to={`/reports/${r.evaluationId}`} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700" title="Download">
                      <Download className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
