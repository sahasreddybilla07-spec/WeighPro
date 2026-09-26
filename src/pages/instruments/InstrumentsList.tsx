import { ChevronRight, PackagePlus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { instruments } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { SelectInput } from '../../components/ui/FormSection'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { TableCard } from '../../components/dashboard/shared/TableCard'

const TYPES = ['All Types', ...Array.from(new Set(instruments.map((i) => i.type)))]
const STATUSES = ['All Statuses', 'Active', 'Under Testing', 'Due for Verification', 'Decommissioned']

export function InstrumentsList() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All Types')
  const [status, setStatus] = useState('All Statuses')

  const filtered = useMemo(() => {
    return instruments.filter((inst) => {
      const matchesQuery =
        !query ||
        inst.model.toLowerCase().includes(query.toLowerCase()) ||
        inst.manufacturer.toLowerCase().includes(query.toLowerCase()) ||
        inst.serial.toLowerCase().includes(query.toLowerCase()) ||
        inst.id.toLowerCase().includes(query.toLowerCase())
      const matchesType = type === 'All Types' || inst.type === type
      const matchesStatus = status === 'All Statuses' || inst.status === status
      return matchesQuery && matchesType && matchesStatus
    })
  }, [query, type, status])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, serial, manufacturer, model…"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <SelectInput value={type} onChange={(e) => setType(e.target.value)} className="w-auto">
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </SelectInput>
          <SelectInput value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto">
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </SelectInput>
          <Link to="/instruments/new">
            <Button>
              <PackagePlus className="h-4 w-4" />
              Register Instrument
            </Button>
          </Link>
        </div>
      </div>

      <TableCard title="Registered Instruments" subtitle={`${filtered.length} of ${instruments.length} instruments`}>
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Instrument ID', 'Type', 'Manufacturer', 'Model', 'Serial', 'Last Evaluation', 'Next Verification', 'Status', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((inst) => (
              <tr key={inst.id} className="group transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{inst.id}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{inst.type}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{inst.manufacturer}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-800">{inst.model}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{inst.serial}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{inst.lastEvaluation ?? '—'}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{inst.nextVerification}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={inst.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right">
                  <Link
                    to={`/instruments/${inst.id}`}
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-ink-100 hover:text-ink-800"
                  >
                    View
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-sm text-ink-400">
                  No instruments match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
