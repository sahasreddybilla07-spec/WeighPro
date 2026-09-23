import { AlertCircle } from 'lucide-react'
import { eccentricLoadingReadings, weighingPerformanceObservations, type EvaluationResult } from '../../../data/mockData'
import { StatusBadge } from '../../../components/ui/StatusBadge'

interface ResultRow {
  label: string
  indicated: string
  error: string
  mpe: string
  result: EvaluationResult
}

const SECTIONS: { title: string; rows: ResultRow[] }[] = [
  {
    title: 'Weighing Performance',
    rows: weighingPerformanceObservations.map((r) => ({ label: r.testLoad, indicated: r.indicated, error: r.error, mpe: r.mpe, result: r.result })),
  },
  {
    title: 'Eccentric Loading',
    rows: eccentricLoadingReadings.map((r) => ({ label: r.position, indicated: r.reading, error: r.error, mpe: r.mpe, result: r.result })),
  },
]

export function ResultsTab() {
  const allRows = SECTIONS.flatMap((s) => s.rows)
  const hasFail = allRows.some((r) => r.result === 'FAIL')
  const hasPending = allRows.some((r) => r.result === 'NOT TESTED')
  const overall = hasFail ? 'FAIL' : hasPending ? 'PENDING' : 'PASS'

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center justify-between rounded-xl px-5 py-4 ${
          overall === 'PASS' ? 'bg-success-50' : overall === 'FAIL' ? 'bg-danger-50' : 'bg-ink-50'
        }`}
      >
        <div className="flex items-center gap-2">
          {overall === 'PENDING' && <AlertCircle className="h-4 w-4 text-ink-400" />}
          <p className="text-sm font-semibold text-ink-900">Overall Result</p>
        </div>
        <StatusBadge status={overall} />
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="overflow-x-auto rounded-xl border border-ink-200">
          <div className="border-b border-ink-100 bg-ink-50 px-5 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{section.title}</p>
          </div>
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr>
                {['Applied Load / Position', 'Indicated Value', 'Error', 'MPE', 'Compliance'].map((col) => (
                  <th key={col} className="whitespace-nowrap px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {section.rows.map((row) => (
                <tr key={row.label}>
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-800">{row.label}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-800">{row.indicated}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-600">{row.error}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-600">{row.mpe}</td>
                  <td className="whitespace-nowrap px-5 py-2.5">
                    <StatusBadge status={row.result} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
