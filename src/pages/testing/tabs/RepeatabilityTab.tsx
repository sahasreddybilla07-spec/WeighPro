import { repeatabilityReadings } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'

export function RepeatabilityTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Number of Repetitions</p>
          <p className="mt-0.5 text-sm font-medium text-ink-900">5</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Applied Load</p>
          <p className="mt-0.5 font-mono text-sm font-medium text-ink-900">2.000 kg</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Permissible Error (MPE)</p>
          <p className="mt-0.5 font-mono text-sm font-medium text-ink-900">±0.005 kg</p>
        </div>
      </div>

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

      <div className="flex items-center justify-between rounded-xl border border-success-100 bg-success-50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-success-700">Repeatability Result</p>
          <p className="mt-0.5 text-xs text-success-700/80">Spread of readings (0.002 kg) is within the permissible error.</p>
        </div>
        <StatusBadge status="PASS" />
      </div>

      <div className="flex justify-end">
        <Button>Save & Continue to Eccentric Loading</Button>
      </div>
    </div>
  )
}
