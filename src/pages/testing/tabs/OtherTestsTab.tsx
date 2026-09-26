import { FlaskConical } from 'lucide-react'
import { useState } from 'react'
import { getEvaluationMeasurements, useAppData } from '../../../context/AppDataContext'
import { Button } from '../../../components/ui/Button'
import { SelectInput, TextArea } from '../../../components/ui/FormSection'
import { StatusBadge } from '../../../components/ui/StatusBadge'

interface OtherTestsTabProps { evaluationId: string; testName: string; onContinue: () => void }

export function OtherTestsTab({ evaluationId, testName, onContinue }: OtherTestsTabProps) {
  const { data, saveMeasurements, updateEvaluation } = useAppData()
  const measurements = getEvaluationMeasurements(data, evaluationId)
  const initial = measurements.other.find((row) => row.name === testName)
    ?? { name: testName, status: 'Not Started' as const, note: '' }
  const rule = data.rules.find((item) => testName.toLowerCase().includes(item.category.toLowerCase()))
  const [test, setTest] = useState(initial)

  function update(changes: Partial<typeof test>) {
    const updated = { ...test, ...changes }
    setTest(updated)
    saveMeasurements(evaluationId, { other: measurements.other.map((row) => row.name === testName ? updated : row) })
  }

  function continueToNext() {
    updateEvaluation(evaluationId, { status: 'Testing' })
    onContinue()
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-start gap-4 rounded-lg border border-ink-200 bg-surface p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><FlaskConical className="h-5 w-5" /></span>
        <div><h3 className="text-base font-semibold text-ink-900">{test.name}</h3><p className="mt-1 text-sm text-ink-500">{rule?.description ?? 'Record the method, observed result, and applicable compliance outcome.'}</p></div>
      </div>
      <label className="block text-sm font-medium text-ink-700">Outcome
        <SelectInput className="mt-1" value={test.status} onChange={(event) => update({ status: event.target.value as typeof test.status })}>
          <option>Not Started</option><option>PASS</option><option>FAIL</option>
        </SelectInput>
      </label>
      <label className="block text-sm font-medium text-ink-700">Observation
        <TextArea className="mt-1" rows={5} value={test.note} onChange={(event) => update({ note: event.target.value })} placeholder="Record the test method and observed result" />
      </label>
      <div className="flex items-center justify-between"><StatusBadge status={test.status === 'Not Started' ? 'NOT TESTED' : test.status} /><Button onClick={continueToNext}>Save &amp; Continue</Button></div>
    </div>
  )
}
