import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getEvaluationMeasurements, useAppData } from '../../../context/AppDataContext'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { localDateString } from '../../../lib/utils'

interface SummaryTabProps { evaluationId: string }

export function SummaryTab({ evaluationId }: SummaryTabProps) {
  const { data, updateEvaluation } = useAppData()
  const navigate = useNavigate()
  const evaluation = data.evaluations.find((row) => row.id === evaluationId)
  if (!evaluation) return null
  const measurements = getEvaluationMeasurements(data, evaluationId)
  const checks = [
    { name: 'Weighing Performance', done: measurements.weighing.every((row) => row.result !== 'NOT TESTED') },
    { name: 'Repeatability', done: measurements.repeatability.every((row) => row.reading !== '—' && row.reading.trim() !== '') && !!measurements.repeatabilityMpe },
    { name: 'Eccentric Loading', done: measurements.eccentric.every((row) => row.result !== 'NOT TESTED') },
    ...measurements.other.map((row) => ({ name: row.name, done: row.status !== 'Not Started' })),
  ]
  const complete = checks.every((row) => row.done)
  const failed = measurements.weighing.some((row) => row.result === 'FAIL') || measurements.eccentric.some((row) => row.result === 'FAIL') || measurements.other.some((row) => row.status === 'FAIL')

  function submit() {
    if (!complete) return
    updateEvaluation(evaluationId, { status: 'Submitted', submittedDate: localDateString(), result: failed ? 'FAIL' : 'PASS' })
    navigate(`/evaluations/${encodeURIComponent(evaluationId)}`)
  }

  return <div className="space-y-6">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-ink-200 bg-surface p-5"><h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Instrument &amp; Evaluation</h4><dl className="mt-3 space-y-2.5">
        {[
          ['Evaluation ID', evaluation.id], ['Instrument', `${evaluation.manufacturer} ${evaluation.model}`], ['Serial Number', evaluation.instrumentSerial], ['Testing Technician', evaluation.tester], ['Legal Reviewer', evaluation.reviewer], ['Purpose', evaluation.purpose ?? '—'], ['Applicant', evaluation.applicant ?? '—'], ['Test date', evaluation.testDate ?? '—'],
        ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 text-sm"><dt className="text-ink-500">{label}</dt><dd className="text-right font-medium text-ink-900">{value}</dd></div>)}
      </dl></div>
      <div className="rounded-xl border border-ink-200 bg-surface p-5"><h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Laboratory Conditions</h4><dl className="mt-3 space-y-2.5">
        {[
          ['Temperature', evaluation.temperature ? `${evaluation.temperature} °C` : '—'], ['Relative Humidity', evaluation.relativeHumidity ? `${evaluation.relativeHumidity} %` : '—'], ['Atmospheric Pressure', evaluation.atmosphericPressure ? `${evaluation.atmosphericPressure} hPa` : '—'], ['Reference Standard', evaluation.referenceStandards ?? '—'], ['Laboratory', evaluation.lab],
        ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 text-sm"><dt className="text-ink-500">{label}</dt><dd className="text-right font-medium text-ink-900">{value}</dd></div>)}
      </dl></div>
    </div>
    <div className="rounded-xl border border-ink-200 bg-surface p-5"><div className="flex items-center justify-between"><h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Test Categories</h4><span className="font-mono text-xs text-ink-500">{checks.filter((row) => row.done).length} / {checks.length} complete</span></div><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {checks.map((row) => <li key={row.name} className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 text-sm"><span className={`flex h-5 w-5 items-center justify-center rounded-full ${row.done ? 'bg-success-500 text-white' : 'bg-ink-200 text-ink-500'}`}>{row.done && <Check className="h-3 w-3" strokeWidth={3} />}</span><span className={row.done ? 'text-ink-800' : 'text-ink-500'}>{row.name}</span></li>)}
    </ul></div>
    <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-ink-50 px-5 py-4"><div><p className="text-sm font-semibold text-ink-900">Evaluation Status</p><p className="mt-0.5 text-xs text-ink-500">{complete ? 'All test categories are recorded and ready for review.' : 'Complete all test readings and applicable categories before submission.'}</p></div><StatusBadge status={evaluation.status} /></div>
    <div className="flex flex-wrap justify-end gap-3"><Button variant="secondary" onClick={() => updateEvaluation(evaluationId, { status: 'Draft' })}>Save Draft</Button><Button variant="secondary" onClick={() => navigate(`/testing?evaluation=${encodeURIComponent(evaluationId)}`)}>Return to Testing</Button><Button disabled={!complete} title={!complete ? 'Complete all test categories before submitting' : undefined} onClick={submit}>Submit for Review</Button></div>
    <p className="text-right text-xs text-ink-400">The assigned legal reviewer or lab manager records the compliance decision after submission.</p>
  </div>
}
