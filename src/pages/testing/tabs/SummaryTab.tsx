import { Check } from 'lucide-react'
import { allEvaluations } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'

const TESTS_PERFORMED = [
  { name: 'Weighing Performance', done: true },
  { name: 'Repeatability', done: true },
  { name: 'Eccentric Loading', done: false },
  { name: 'Other Tests', done: false },
]

export function SummaryTab() {
  const evaluation = allEvaluations.find((e) => e.id === 'EV-2026-0138')!

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Instrument &amp; Evaluation</h4>
          <dl className="mt-3 space-y-2.5">
            {[
              ['Evaluation ID', evaluation.id],
              ['Instrument', `${evaluation.manufacturer} ${evaluation.model}`],
              ['Serial Number', evaluation.instrumentSerial],
              ['Tester', evaluation.tester],
              ['Reviewer', evaluation.reviewer],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <dt className="text-ink-500">{label}</dt>
                <dd className="font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Laboratory Conditions</h4>
          <dl className="mt-3 space-y-2.5">
            {[
              ['Temperature', '23.5 °C'],
              ['Relative Humidity', '52 %'],
              ['Reference Standard', 'OIML Class F1 weight set'],
              ['Laboratory', evaluation.lab.split(',')[0]],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <dt className="text-ink-500">{label}</dt>
                <dd className="font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rounded-xl border border-ink-200 bg-white p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Tests Performed</h4>
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {TESTS_PERFORMED.map((t) => (
            <li key={t.name} className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 text-sm">
              <span className={`flex h-4 w-4 items-center justify-center rounded-full ${t.done ? 'bg-success-500 text-white' : 'bg-ink-200 text-ink-400'}`}>
                {t.done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
              </span>
              <span className={t.done ? 'text-ink-800' : 'text-ink-400'}>{t.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-ink-50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">Evaluation Status</p>
          <p className="mt-0.5 text-xs text-ink-500">2 of 4 test categories complete — finish remaining tests before submitting.</p>
        </div>
        <StatusBadge status={evaluation.status} />
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="secondary">Save Draft</Button>
        <Button variant="secondary">Return to Testing</Button>
        <Button disabled title="Complete all test categories before submitting">
          Submit for Review
        </Button>
      </div>
      <p className="text-right text-xs text-ink-400">Only a reviewer or lab manager can approve an evaluation — testers cannot approve their own work.</p>
    </div>
  )
}
