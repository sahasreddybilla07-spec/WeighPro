import { FileText, Image as ImageIcon, MapPin, ScrollText } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { allEvaluations, instruments } from '../../data/mockData'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { TableCard } from '../../components/dashboard/shared/TableCard'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'

export function InstrumentDetails() {
  const { id } = useParams()
  const instrument = instruments.find((i) => i.id === id) ?? instruments[0]
  const history = allEvaluations.filter((e) => e.instrumentId === instrument.id)

  const activity = history.slice(0, 4).map((e) => ({
    id: `${e.id}-act`,
    type: (e.status === 'Approved' || e.status === 'Completed' ? 'approved' : e.status === 'Correction Required' ? 'correction' : 'submitted') as
      | 'approved'
      | 'correction'
      | 'submitted',
    title: e.status === 'Approved' || e.status === 'Completed' ? 'Evaluation approved' : e.status === 'Correction Required' ? 'Correction requested' : 'Evaluation submitted',
    reference: `${e.id} · ${e.manufacturer} ${e.model}`,
    actor: e.reviewer,
    timestamp: e.reviewedDate ?? e.submittedDate ?? e.createdDate,
  }))

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-ink-900">{instrument.manufacturer} {instrument.model}</h2>
              <StatusBadge status={instrument.status} />
            </div>
            <p className="mt-1 font-mono text-xs text-ink-500">{instrument.id} · Serial {instrument.serial}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
              <MapPin className="h-4 w-4 text-ink-400" />
              {instrument.location} · {instrument.lab}
            </p>
          </div>
          <Link to="/evaluations/new">
            <Button>Start Evaluation</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Technical Specifications</h3>
          <dl className="mt-4 space-y-3">
            {[
              ['Instrument Type', instrument.type],
              ['Capacity', instrument.capacity],
              ['Verification Scale Interval', instrument.scaleInterval],
              ['Accuracy Class', instrument.accuracyClass],
              ['Owner / Applicant', instrument.owner],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-ink-100 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-ink-500">{label}</dt>
                <dd className="text-sm font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Verification Information</h3>
          <dl className="mt-4 space-y-3">
            {[
              ['Registration Date', instrument.registrationDate],
              ['Last Evaluation', instrument.lastEvaluation ?? 'Not yet evaluated'],
              ['Next Verification Due', instrument.nextVerification],
              ['Current Status', instrument.status],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-ink-100 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-ink-500">{label}</dt>
                <dd className="text-sm font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-lg border border-ink-100 bg-ink-50 p-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <ScrollText className="h-3.5 w-3.5" /> Documents / Evidence
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-xs text-ink-600">
                <ImageIcon className="h-3.5 w-3.5 text-ink-400" /> instrument_photo.jpg
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-xs text-ink-600">
                <FileText className="h-3.5 w-3.5 text-ink-400" /> manufacturer_certificate.pdf
              </span>
            </div>
          </div>
        </div>
      </div>

      <TableCard title="Evaluation History" subtitle={`${history.length} evaluations recorded for this instrument`}>
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Evaluation ID', 'Date', 'Tester', 'Reviewer', 'Status', 'Result', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {history.map((e) => (
              <tr key={e.id} className="transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-900">{e.id}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{e.createdDate}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.tester}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{e.reviewer}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={e.result} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right">
                  <Link to={`/evaluations/${e.id}`} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-sm text-ink-400">
                  No evaluations recorded yet for this instrument.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableCard>

      {activity.length > 0 && <ActivityFeed title="Recent Activity" items={activity} maxHeightPx={260} />}
    </div>
  )
}
