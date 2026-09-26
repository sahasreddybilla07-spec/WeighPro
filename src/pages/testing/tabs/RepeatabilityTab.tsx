import { repeatabilityReadings } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { CalculationExplainer } from '../../../components/testing/CalculationExplainer'
import { cn, parseKg } from '../../../lib/utils'

const MPE_KG = 0.005

const readingValues = repeatabilityReadings.map((row) => parseKg(row.reading)!)
const maxReading = Math.max(...readingValues)
const minReading = Math.min(...readingValues)
const spreadKg = maxReading - minReading
const spreadPass = spreadKg <= MPE_KG

export function RepeatabilityTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Number of Repetitions</p>
          <p className="mt-0.5 text-sm font-medium text-ink-900">{repeatabilityReadings.length}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Applied Load</p>
          <p className="mt-0.5 font-mono text-sm font-medium text-ink-900">2.000 kg</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Permissible Error (MPE)</p>
          <p className="mt-0.5 font-mono text-sm font-medium text-ink-900">±{MPE_KG.toFixed(3)} kg</p>
        </div>
      </div>

      <CalculationExplainer
        formula="Spread = Max Reading − Min Reading"
        passCondition="PASS when Spread ≤ Permissible Error (MPE)"
        example={`${maxReading.toFixed(3)} kg − ${minReading.toFixed(3)} kg = ${spreadKg.toFixed(3)} kg, ${spreadPass ? 'within' : 'exceeds'} ±${MPE_KG.toFixed(3)} kg → ${spreadPass ? 'PASS' : 'FAIL'}`}
      />

      <div className="overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Repetition', 'Reading', 'Error'].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {repeatabilityReadings.map((row) => (
              <tr key={row.rep}>
                <td className="whitespace-nowrap px-5 py-3 text-sm text-ink-700">Reading {row.rep}</td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-800">{row.reading}</td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-600">{row.error}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          'flex items-center justify-between rounded-xl border px-5 py-4',
          spreadPass ? 'border-success-100 bg-success-50' : 'border-danger-100 bg-danger-50',
        )}
      >
        <div>
          <p className={cn('text-sm font-semibold', spreadPass ? 'text-success-700' : 'text-danger-700')}>Repeatability Result</p>
          <p className={cn('mt-0.5 text-xs', spreadPass ? 'text-success-700/80' : 'text-danger-700/80')}>
            Spread of readings ({spreadKg.toFixed(3)} kg) is {spreadPass ? 'within' : 'outside'} the permissible error.
          </p>
        </div>
        <StatusBadge status={spreadPass ? 'PASS' : 'FAIL'} />
      </div>

      <div className="flex justify-end">
        <Button>Save & Continue to Eccentric Loading</Button>
      </div>
    </div>
  )
}
