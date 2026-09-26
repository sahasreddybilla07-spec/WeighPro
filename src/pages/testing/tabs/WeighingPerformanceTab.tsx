import { Check, UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { useAppData, getEvaluationMeasurements } from '../../../context/AppDataContext'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { CalculationExplainer } from '../../../components/testing/CalculationExplainer'
import { formatSignedKg, parseKg } from '../../../lib/utils'

interface WeighingPerformanceTabProps { evaluationId: string; onContinue: () => void }

export function WeighingPerformanceTab({ evaluationId, onContinue }: WeighingPerformanceTabProps) {
  const { data, saveMeasurements, updateEvaluation } = useAppData()
  const observations = getEvaluationMeasurements(data, evaluationId).weighing
  const evaluation = data.evaluations.find((row) => row.id === evaluationId)
  const instrument = data.instruments.find((row) => row.id === evaluation?.instrumentId)
  const unit = instrument?.capacity.match(/\d+(?:\.\d+)?\s*([a-zA-Z]+)/)?.[1] ?? 'kg'
  const [values, setValues] = useState<Record<string, string>>({})
  const [mpes, setMpes] = useState<Record<string, string>>({})
  const [evidence, setEvidence] = useState<File[]>([])
  const example = observations.find((row) => row.result !== 'NOT TESTED')
  const workedExample = example ? `${example.indicated} − ${example.testLoad} = ${example.error}, within ${example.mpe} → ${example.result}` : undefined

  function getEnteredRows() {
    return observations.map((row) => {
      const savedValue = values[row.testLoad] ?? (row.indicated === '—' ? '' : String(parseKg(row.indicated) ?? ''))
      const mpe = mpes[row.testLoad] ?? row.mpe
      const indicated = Number(savedValue)
      const reference = parseKg(row.testLoad)
      const tolerance = parseKg(mpe)
      if (!savedValue.trim() || !Number.isFinite(indicated) || reference === null || tolerance === null) return row
      const error = indicated - reference
      const decimals = Math.min(6, Math.max(3, (savedValue.split('.')[1] ?? '').length))
      return { ...row, indicated: `${indicated.toFixed(decimals)} ${unit}`, error: formatSignedKg(error, 3, unit), mpe, result: Math.abs(error) <= tolerance ? 'PASS' as const : 'FAIL' as const }
    })
  }

  function saveReading() {
    saveMeasurements(evaluationId, { weighing: getEnteredRows() })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Reference Standard</p><p className="mt-0.5 text-sm font-medium text-ink-900">{evaluation?.referenceStandards ?? 'Not recorded'}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Unit</p><p className="mt-0.5 text-sm font-medium text-ink-900">{unit}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Test Loads Remaining</p><p className="mt-0.5 text-sm font-medium text-ink-900">{observations.filter((row) => row.result === 'NOT TESTED').length} of {observations.length}</p></div>
      </div>

      <CalculationExplainer formula="Error = Indicated Value − Test Load" passCondition="PASS when |Error| ≤ Permissible Error (MPE)" example={workedExample} />

      <div className="overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead><tr className="bg-ink-50">{['Test Load', 'Indicated Value (kg)', 'Error', 'Permissible Error (MPE)', 'Result', ''].map((col) => <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">{col}</th>)}</tr></thead>
          <tbody className="divide-y divide-ink-100">
            {observations.map((row) => {
              const saved = values[row.testLoad] ?? (row.indicated === '—' ? '' : String(parseKg(row.indicated) ?? ''))
              const typed = saved.trim() ? Number(saved) : NaN
              const load = parseKg(row.testLoad)
              const mpeValue = mpes[row.testLoad] ?? row.mpe
              const mpe = parseKg(mpeValue)
              const preview = Number.isFinite(typed) && load !== null && mpe !== null
              const error = preview ? typed - load : null
              const pass = preview && error !== null ? Math.abs(error) <= mpe! : null
              return (
                <tr key={row.testLoad} className={row.result === 'NOT TESTED' ? 'bg-cyan-50/30' : undefined}>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-800">{row.testLoad}</td>
                  <td className="whitespace-nowrap px-5 py-3"><input type="number" step="any" value={saved} onChange={(event) => setValues((current) => ({ ...current, [row.testLoad]: event.target.value }))} placeholder="Enter reading" inputMode="decimal" aria-label={`Indicated reading for ${row.testLoad}`} className="w-32 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900 focus:border-cyan-500 focus:outline-none" /></td>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-600">{error !== null ? formatSignedKg(error, 3, unit) : row.error}</td>
                  <td className="px-5 py-3"><input value={mpeValue} onChange={(event) => setMpes((current) => ({ ...current, [row.testLoad]: event.target.value }))} aria-label={`Maximum permissible error for ${row.testLoad}`} placeholder="± MPE" className="w-32 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900" /></td>
                  <td className="whitespace-nowrap px-5 py-3">{pass !== null ? <StatusBadge status={pass ? 'PASS' : 'FAIL'} /> : <StatusBadge status={row.result} />}</td>
                  <td className="whitespace-nowrap px-5 py-3"><button type="button" disabled={!saved.trim() || mpe === null} onClick={saveReading} className="inline-flex items-center gap-1 rounded-md bg-brand-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-40"><Check className="h-3.5 w-3.5" /> Save</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 px-6 py-6 text-center"><UploadCloud className="h-5 w-5 text-ink-400" /><label className="cursor-pointer text-sm font-medium text-ink-700">Attach test setup evidence<input className="sr-only" type="file" multiple accept="image/*,.pdf" onChange={(event) => setEvidence((current) => [...current, ...Array.from(event.target.files ?? [])])} /></label><p className="text-xs text-ink-400">Photos of instrument display and test load setup</p>{evidence.map((file, index) => <p key={`${file.name}-${index}`} className="text-xs text-ink-600">{file.name}</p>)}</div>
      <div className="flex justify-end"><Button onClick={() => { saveMeasurements(evaluationId, { weighing: getEnteredRows(), attachments: [...(getEvaluationMeasurements(data, evaluationId).attachments ?? []), ...evidence.map((file) => file.name)] }); updateEvaluation(evaluationId, { status: 'Testing' }); onContinue() }}>Save &amp; Continue to Repeatability</Button></div>
    </div>
  )
}
