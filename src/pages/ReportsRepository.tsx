import { Download, Eye, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { getReports } from '../lib/dataSelectors'
import { SelectInput } from '../components/ui/FormSection'
import { StatusBadge } from '../components/ui/StatusBadge'
import { TableCard } from '../components/dashboard/shared/TableCard'

export function ReportsRepository() {
  const { data } = useAppData()
  const reportsList = getReports(data)
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('All Results')

  const rows = useMemo(() => {
    return reportsList
      .filter((r) => result === 'All Results' || r.result === result)
      .filter(
        (r) =>
          !query ||
          String(r.reportId ?? '').toLowerCase().includes(query.toLowerCase()) ||
          String(r.instrument ?? '').toLowerCase().includes(query.toLowerCase()) ||
          String(r.serial ?? '').toLowerCase().includes(query.toLowerCase()),
      )
  }, [reportsList, query, result])

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
          {['All Results', 'PASS', 'FAIL', 'PENDING'].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </SelectInput>
      </div>

      <TableCard title="Reports Repository" subtitle={`${rows.length} of ${reportsList.length} reports`}>
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Report ID', 'Instrument', 'Serial', 'Evaluation', 'Date', 'Result', 'Legal Reviewer', 'Status'].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-sm text-ink-500">
                  No reports match the current filters.
                </td>
              </tr>
            ) : rows.map((r) => (
              <tr key={r.reportId} className="transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5">
                  <div className="font-mono text-xs font-medium text-ink-900">{r.reportId}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Link to={`/reports/${r.evaluationId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900" title="Preview report">
                      <Eye className="h-3.5 w-3.5" />Preview
                    </Link>
                    <Link to={`/reports/${r.evaluationId}?download=1`} className="inline-flex items-center gap-1 text-xs font-semibold text-ink-600 hover:text-ink-900" title="Download PDF">
                      <Download className="h-3.5 w-3.5" />Download
                    </Link>
                  </div>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
