import { ChevronRight, FilePlus2, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allEvaluations } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { SelectInput } from '../../components/ui/FormSection'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { TableCard } from '../../components/dashboard/shared/TableCard'

const STATUSES = ['All Statuses', 'Draft', 'Assigned', 'Testing', 'Submitted', 'Under Review', 'Correction Required', 'Approved', 'Completed']

export function EvaluationsList() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All Statuses')

  const rows = useMemo(() => {
    return [...allEvaluations]
      .sort((a, b) => b.id.localeCompare(a.id))
      .filter((e) => status === 'All Statuses' || e.status === status)
      .filter(
        (e) =>
          !query ||
          e.id.toLowerCase().includes(query.toLowerCase()) ||
          e.tester.toLowerCase().includes(query.toLowerCase()) ||
          e.manufacturer.toLowerCase().includes(query.toLowerCase()) ||
          e.model.toLowerCase().includes(query.toLowerCase()),
      )
  }, [query, status])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, instrument, tester…"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <SelectInput value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto">
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </SelectInput>
          <Link to="/evaluations/new">
            <Button>
              <FilePlus2 className="h-4 w-4" />
              Create Evaluation
            </Button>
          </Link>
        </div>
      </div>

      <TableCard title="Evaluations" subtitle={`${rows.length} of ${allEvaluations.length} evaluations`}>
        <table className="w-full min-w-[920px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Evaluation ID', 'Instrument', 'Laboratory', 'Testing Technician', 'Legal Reviewer', 'Status', 'Result', ''].map((col) => (
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
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{e.lab.split(',')[0]}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.tester}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.reviewer}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.result} />
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
