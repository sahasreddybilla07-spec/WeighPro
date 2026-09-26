import { useState } from 'react'
import { useAppData, getEvaluationMeasurements } from '../../../context/AppDataContext'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { CalculationExplainer } from '../../../components/testing/CalculationExplainer'
import { formatSignedKg, parseKg } from '../../../lib/utils'

interface RepeatabilityTabProps { evaluationId: string; onContinue: () => void }

export function RepeatabilityTab({ evaluationId, onContinue }: RepeatabilityTabProps) {
  const { data, saveMeasurements, updateEvaluation } = useAppData()
  const measurement = getEvaluationMeasurements(data, evaluationId)
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  const [appliedLoad, setAppliedLoad] = useState(measurement.repeatabilityLoad)
  const [mpe, setMpe] = useState(measurement.repeatabilityMpe)
  const readings = measurement.repeatability.map((row) => drafts[row.rep] ?? (row.reading === '—' ? '' : String(parseKg(row.reading) ?? '')))
  const numbers = readings.map(Number).filter((value, index) => readings[index].trim() !== '' && Number.isFinite(value))
  const spread = numbers.length > 1 ? Math.max(...numbers) - Math.min(...numbers) : 0
  const tolerance = parseKg(mpe)
  const unit = appliedLoad.match(/[a-zA-Z]+$/)?.[0] ?? 'kg'
  const passed = numbers.length === readings.length && readings.length > 0 && tolerance !== null && spread <= tolerance
  const example = numbers.length > 1 && tolerance !== null ? `${Math.max(...numbers).toFixed(3)} − ${Math.min(...numbers).toFixed(3)} = ${spread.toFixed(3)}, ${passed ? 'within' : 'outside'} ${mpe} → ${passed ? 'PASS' : 'FAIL'}` : undefined

  function save() {
    const load = parseKg(appliedLoad)
    const validMpe = parseKg(mpe)
    if (load === null || validMpe === null || numbers.length !== readings.length) return
    const rows = measurement.repeatability.map((row, index) => ({ ...row, reading: `${Number(readings[index]).toFixed(3)} ${unit}`, error: formatSignedKg(Number(readings[index]) - load, 3, unit) }))
    saveMeasurements(evaluationId, { repeatability: rows, repeatabilityLoad: appliedLoad, repeatabilityMpe: mpe })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-500">Applied load<input className="mt-1 block w-full rounded-md border border-ink-200 bg-surface px-3 py-2 font-mono text-sm font-normal normal-case text-ink-900" value={appliedLoad} onChange={(event) => setAppliedLoad(event.target.value)} placeholder="e.g. 2.000 kg" /></label>
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-500">Permissible error (MPE)<input className="mt-1 block w-full rounded-md border border-ink-200 bg-surface px-3 py-2 font-mono text-sm font-normal normal-case text-ink-900" value={mpe} onChange={(event) => setMpe(event.target.value)} placeholder="e.g. ±0.005 kg" /></label>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Repetitions recorded</p><p className="mt-1 font-mono text-lg font-medium text-ink-900">{numbers.length} / {readings.length}</p></div>
      </div>
      <CalculationExplainer formula="Spread = Highest Reading − Lowest Reading" passCondition="PASS when all repetitions are recorded and Spread ≤ MPE" example={example} />
      <div className="overflow-x-auto rounded-xl border border-ink-200"><table className="w-full min-w-[480px] border-collapse text-left">
        <thead><tr className="bg-ink-50">{['Repetition', 'Reading', 'Error'].map((col) => <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">{col}</th>)}</tr></thead>
        <tbody className="divide-y divide-ink-100">{measurement.repeatability.map((row, index) => <tr key={row.rep}>
          <td className="whitespace-nowrap px-5 py-3 text-sm text-ink-700">Reading {row.rep}</td>
          <td className="px-5 py-3"><input type="number" step="any" value={readings[index]} onChange={(event) => setDrafts((current) => ({ ...current, [row.rep]: event.target.value }))} aria-label={`Repeatability reading ${row.rep}`} placeholder="Enter reading" className="w-36 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900" /></td>
          <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-600">{readings[index].trim() && parseKg(appliedLoad) !== null ? formatSignedKg(Number(readings[index]) - parseKg(appliedLoad)!, 3, unit) : row.error}</td>
        </tr>)}</tbody>
      </table></div>
      <div className={`flex items-center justify-between rounded-xl border px-5 py-4 ${passed ? 'border-success-100 bg-success-50' : 'border-warning-100 bg-warning-50'}`}>
        <div><p className={`text-sm font-semibold ${passed ? 'text-success-700' : 'text-warning-700'}`}>Repeatability Result</p><p className="mt-0.5 text-xs text-ink-600">{numbers.length === readings.length && tolerance !== null ? `Spread ${spread.toFixed(3)} is ${passed ? 'within' : 'outside'} the permissible error.` : 'Enter all readings, the applied load, and the applicable MPE to calculate compliance.'}</p></div>
        <StatusBadge status={passed ? 'PASS' : numbers.length === readings.length && tolerance !== null ? 'FAIL' : 'NOT TESTED'} />
      </div>
      <div className="flex justify-end"><Button disabled={!passed && (numbers.length !== readings.length || tolerance === null)} onClick={() => { save(); updateEvaluation(evaluationId, { status: 'Testing' }); onContinue() }}>Save &amp; Continue to Eccentric Loading</Button></div>
    </div>
  )
}
