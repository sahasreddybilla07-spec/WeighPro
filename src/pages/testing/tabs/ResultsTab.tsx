import { AlertCircle } from 'lucide-react'
import { getEvaluationMeasurements, useAppData } from '../../../context/AppDataContext'
import type { EvaluationResult } from '../../../data/mockData'
import { StatusBadge } from '../../../components/ui/StatusBadge'

interface ResultsTabProps { evaluationId: string }
interface ResultRow { label: string; indicated: string; error: string; mpe: string; result: EvaluationResult }

export function ResultsTab({ evaluationId }: ResultsTabProps) {
  const { data } = useAppData()
  const measurements = getEvaluationMeasurements(data, evaluationId)
  const repeatabilityValues = measurements.repeatability.map((row) => Number(row.reading.match(/^[-+]?\d*\.?\d+/)?.[0])).filter(Number.isFinite)
  const repeatabilitySpread = repeatabilityValues.length ? Math.max(...repeatabilityValues) - Math.min(...repeatabilityValues) : 0
  const repeatabilityMpe = Number(measurements.repeatabilityMpe.match(/^[-+]?\d*\.?\d+/)?.[0])
  const repeatabilityComplete = repeatabilityValues.length === measurements.repeatability.length && Number.isFinite(repeatabilityMpe)
  const repeatabilityResult: EvaluationResult = !repeatabilityComplete ? 'NOT TESTED' : repeatabilitySpread <= repeatabilityMpe ? 'PASS' : 'FAIL'
  const sections: { title: string; rows: ResultRow[] }[] = [
    { title: 'Weighing Performance', rows: measurements.weighing.map((row) => ({ label: row.testLoad, indicated: row.indicated, error: row.error, mpe: row.mpe || '—', result: row.result })) },
    { title: 'Repeatability', rows: measurements.repeatability.map((row) => ({ label: `Reading ${row.rep}`, indicated: row.reading, error: row.error, mpe: measurements.repeatabilityMpe || '—', result: repeatabilityResult })) },
    { title: 'Eccentric Loading', rows: measurements.eccentric.map((row) => ({ label: row.position, indicated: row.reading, error: row.error, mpe: row.mpe || '—', result: row.result })) },
  ]
  const allRows = sections.flatMap((section) => section.rows)
  const hasFail = allRows.some((row) => row.result === 'FAIL') || measurements.other.some((row) => row.status === 'FAIL')
  const hasPending = allRows.some((row) => row.result === 'NOT TESTED') || measurements.other.some((row) => row.status === 'Not Started')
  const overall = hasFail ? 'FAIL' : hasPending ? 'PENDING' : 'PASS'

  return <div className="space-y-6">
    <div className={`flex items-center justify-between rounded-xl px-5 py-4 ${overall === 'PASS' ? 'bg-success-50' : overall === 'FAIL' ? 'bg-danger-50' : 'bg-ink-50'}`}>
      <div className="flex items-center gap-2">{overall === 'PENDING' && <AlertCircle className="h-4 w-4 text-warning-600" />}<p className="text-sm font-semibold text-ink-900">Overall Result</p></div><StatusBadge status={overall} />
    </div>
    {sections.map((section) => <div key={section.title} className="overflow-x-auto rounded-xl border border-ink-200">
      <div className="border-b border-ink-100 bg-ink-50 px-5 py-2.5"><p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{section.title}</p></div>
      <table className="w-full min-w-[600px] border-collapse text-left"><thead><tr>{['Applied Load / Position', 'Indicated Value', 'Error', 'MPE', 'Compliance'].map((col) => <th key={col} className="whitespace-nowrap px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">{col}</th>)}</tr></thead>
        <tbody className="divide-y divide-ink-100">{section.rows.map((row) => <tr key={row.label}><td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-800">{row.label}</td><td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-800">{row.indicated}</td><td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-600">{row.error}</td><td className="whitespace-nowrap px-5 py-2.5 font-mono text-sm text-ink-600">{row.mpe}</td><td className="whitespace-nowrap px-5 py-2.5"><StatusBadge status={row.result} /></td></tr>)}</tbody>
      </table>
    </div>)}
    <div className="grid gap-3 sm:grid-cols-3">{measurements.other.map((row) => <div key={row.name} className="flex items-center justify-between rounded-lg border border-ink-200 bg-surface px-4 py-3"><span className="text-sm text-ink-700">{row.name}</span><StatusBadge status={row.status === 'Not Started' ? 'NOT TESTED' : row.status} /></div>)}</div>
  </div>
}
