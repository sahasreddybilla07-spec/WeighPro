import { Check, UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { weighingPerformanceObservations } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import { CalculationExplainer } from '../../../components/testing/CalculationExplainer'
import { formatSignedKg, parseKg } from '../../../lib/utils'

const FIRST_COMPLETED = weighingPerformanceObservations.find((r) => r.result !== 'NOT TESTED')
const WORKED_EXAMPLE = FIRST_COMPLETED
  ? `${FIRST_COMPLETED.indicated} − ${FIRST_COMPLETED.testLoad} = ${FIRST_COMPLETED.error}, within ${FIRST_COMPLETED.mpe} → ${FIRST_COMPLETED.result}`
  : undefined

export function WeighingPerformanceTab() {
  const [values, setValues] = useState<Record<string, string>>({})

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Reference Standard</p>
          <p className="mt-0.5 text-sm font-medium text-ink-900">OIML Class F1 weight set</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Unit</p>
          <p className="mt-0.5 text-sm font-medium text-ink-900">Kilograms (kg)</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Test Loads Remaining</p>
          <p className="mt-0.5 text-sm font-medium text-ink-900">2 of 6</p>
        </div>
      </div>

      <CalculationExplainer
        formula="Error = Indicated Value − Test Load"
        passCondition="PASS when |Error| ≤ Permissible Error (MPE)"
        example={WORKED_EXAMPLE}
      />

      <div className="overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Test Load', 'Indicated Value', 'Error', 'Permissible Error (MPE)', 'Result', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {weighingPerformanceObservations.map((row) => {
              const pending = row.result === 'NOT TESTED'
              const typed = values[row.testLoad]
              const typedNum = typed ? parseFloat(typed) : NaN
              const testLoadNum = parseKg(row.testLoad)
              const mpeNum = parseKg(row.mpe)
              const hasPreview = pending && !Number.isNaN(typedNum) && testLoadNum !== null && mpeNum !== null
              const previewError = hasPreview ? typedNum - testLoadNum! : null
              const previewPass = hasPreview && previewError !== null ? Math.abs(previewError) <= mpeNum! : null

              return (
                <tr key={row.testLoad} className={pending ? 'bg-cyan-50/30' : undefined}>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-800">{row.testLoad}</td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {pending ? (
                      <input
                        value={values[row.testLoad] ?? ''}
                        onChange={(e) => setValues((v) => ({ ...v, [row.testLoad]: e.target.value }))}
                        placeholder="Reading (kg)…"
                        inputMode="decimal"
                        className="w-32 rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-sm text-ink-900 focus:border-cyan-500 focus:outline-none"
                      />
                    ) : (
                      <span className="font-mono text-sm text-ink-800">{row.indicated}</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-600">
                    {pending ? (previewError !== null ? formatSignedKg(previewError) : '—') : row.error}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-ink-600">{row.mpe}</td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {pending ? (
                      previewPass !== null ? (
                        <StatusBadge status={previewPass ? 'PASS' : 'FAIL'} />
                      ) : (
                        <StatusBadge status="NOT TESTED" />
                      )
                    ) : (
                      <StatusBadge status={row.result} />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {pending && (
                      <button
                        type="button"
                        disabled={!values[row.testLoad]}
                        className="inline-flex items-center gap-1 rounded-md bg-brand-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-40"
                      >
                        <Check className="h-3.5 w-3.5" /> Save
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 px-6 py-6 text-center">
        <UploadCloud className="h-5 w-5 text-ink-400" />
        <p className="text-sm font-medium text-ink-700">Attach test setup evidence</p>
        <p className="text-xs text-ink-400">Photos of instrument display and test load setup</p>
      </div>

      <div className="flex justify-end">
        <Button>Save & Continue to Repeatability</Button>
      </div>
    </div>
  )
}
