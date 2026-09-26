import { useState } from 'react'
import { useAppData, getEvaluationMeasurements } from '../../../context/AppDataContext'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { CalculationExplainer } from '../../../components/testing/CalculationExplainer'
import { formatSignedKg, parseKg } from '../../../lib/utils'

const POSITION_COORDS: Record<string, { x: number; y: number }> = {
  Center: { x: 110, y: 70 }, 'Front Left': { x: 40, y: 30 }, 'Front Right': { x: 180, y: 30 }, 'Rear Left': { x: 40, y: 110 }, 'Rear Right': { x: 180, y: 110 },
}
interface EccentricLoadingTabProps { evaluationId: string; onContinue: () => void }

export function EccentricLoadingTab({ evaluationId, onContinue }: EccentricLoadingTabProps) {
  const { data, saveMeasurements, updateEvaluation } = useAppData()
  const measurement = getEvaluationMeasurements(data, evaluationId)
  const [load, setLoad] = useState(measurement.eccentricLoad)
  const [readings, setReadings] = useState<Record<string, string>>({})
  const [mpes, setMpes] = useState<Record<string, string>>({})
  const reference = parseKg(load)
  const rows = measurement.eccentric.map((row) => ({ ...row, reading: readings[row.position] ?? (row.reading === '—' ? '' : String(parseKg(row.reading) ?? '')), mpe: mpes[row.position] ?? row.mpe }))
  const first = rows.find((row) => row.result !== 'NOT TESTED')
  const allEntered = rows.every((row) => row.reading.trim() !== '' && parseKg(row.mpe) !== null) && reference !== null

  function save() {
    if (!allEntered || reference === null) return
    const saved = rows.map((row) => {
      const value = Number(row.reading)
      const tolerance = parseKg(row.mpe)!
      const error = value - reference
      const unit = load.match(/[a-zA-Z]+$/)?.[0] ?? 'kg'
      return { ...row, reading: `${value.toFixed(3)} ${unit}`, error: formatSignedKg(error, 3, unit), result: Math.abs(error) <= tolerance ? 'PASS' as const : 'FAIL' as const }
    })
    saveMeasurements(evaluationId, { eccentric: saved, eccentricLoad: load })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-500">Applied load<input value={load} onChange={(event) => setLoad(event.target.value)} placeholder="e.g. 2.000 kg" className="mt-1 block w-full rounded-md border border-ink-200 bg-surface px-3 py-2 font-mono text-sm font-normal normal-case text-ink-900" /></label>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Load positions recorded</p><p className="mt-1 font-mono text-lg font-medium text-ink-900">{rows.filter((row) => row.result !== 'NOT TESTED').length} / {rows.length}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Instrument accuracy class</p><p className="mt-1 text-sm font-medium text-ink-900">{data.instruments.find((row) => row.id === data.evaluations.find((evaluation) => evaluation.id === evaluationId)?.instrumentId)?.accuracyClass ?? '—'}</p></div>
      </div>
      <CalculationExplainer formula="Error = Reading − Applied Load" passCondition="PASS when |Error| ≤ the applicable MPE for each load position" example={first ? `${first.position}: ${first.reading} − ${load} = ${first.error}, ${first.result}` : undefined} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex items-center justify-center rounded-xl border border-ink-200 bg-ink-50 p-4"><svg width="220" height="140" viewBox="0 0 220 140"><rect x="20" y="10" width="180" height="120" rx="10" className="fill-surface stroke-ink-200" strokeWidth="2" />{rows.map((row) => { const coord = POSITION_COORDS[row.position]; if (!coord) return null; const tested = row.result !== 'NOT TESTED'; return <g key={row.position}><circle cx={coord.x} cy={coord.y} r="14" strokeWidth="2" className={tested ? 'fill-success-50 stroke-success-500' : 'fill-ink-100 stroke-ink-300'} /><text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="9" fontWeight="600" className={tested ? 'fill-success-700' : 'fill-ink-400'}>{row.position === 'Center' ? 'C' : row.position.split(' ').map((word) => word[0]).join('')}</text></g> })}</svg></div>
        <div className="overflow-x-auto rounded-xl border border-ink-200"><table className="w-full min-w-[760px] border-collapse text-left">
          <thead><tr className="bg-ink-50">{['Load Position', 'Reading', 'Error', 'MPE', 'Result'].map((col) => <th key={col} className="whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">{col}</th>)}</tr></thead>
          <tbody className="divide-y divide-ink-100">{rows.map((row) => { const previewMpe = parseKg(row.mpe); const value = row.reading.trim() ? Number(row.reading) : NaN; const preview = Number.isFinite(value) && reference !== null && previewMpe !== null; const error = preview ? value - reference! : null; const pass = preview && error !== null ? Math.abs(error) <= previewMpe! : null; return <tr key={row.position}>
            <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-700">{row.position}</td>
            <td className="px-4 py-3"><input type="number" step="any" value={row.reading} onChange={(event) => setReadings((current) => ({ ...current, [row.position]: event.target.value }))} aria-label={`${row.position} reading`} placeholder="Reading" className="w-28 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900" /></td>
            <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-600">{error !== null ? formatSignedKg(error, 3, load.match(/[a-zA-Z]+$/)?.[0] ?? 'kg') : row.error}</td>
            <td className="px-4 py-3"><input value={row.mpe} onChange={(event) => setMpes((current) => ({ ...current, [row.position]: event.target.value }))} aria-label={`${row.position} maximum permissible error`} placeholder="± MPE" className="w-28 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900" /></td>
            <td className="whitespace-nowrap px-4 py-3">{pass !== null ? <StatusBadge status={pass ? 'PASS' : 'FAIL'} /> : <StatusBadge status={row.result} />}</td>
          </tr> })}</tbody>
        </table></div>
      </div>
      <div className="flex justify-end"><Button disabled={!allEntered} onClick={() => { save(); updateEvaluation(evaluationId, { status: 'Testing' }); onContinue() }}>Save &amp; Continue to Other Tests</Button></div>
    </div>
  )
}
