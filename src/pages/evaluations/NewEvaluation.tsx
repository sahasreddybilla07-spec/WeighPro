import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppData } from '../../context/AppDataContext'
import { Button } from '../../components/ui/Button'
import { Field, FormSection, SelectInput, TextInput } from '../../components/ui/FormSection'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'
import { localDateString } from '../../lib/utils'

const STEPS = ['Select Instrument', 'Evaluation Details', 'Lab Conditions', 'Assign Testing Technician', 'Assign Legal Reviewer', 'Begin Testing']

export function NewEvaluation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data, addEvaluation } = useAppData()
  const instruments = data.instruments.filter((row) => row.status !== 'Decommissioned')
  const testers = data.users.filter((row) => row.status === 'Active' && row.role === 'Testing Technician')
  const reviewers = data.users.filter((row) => row.status === 'Active' && row.role === 'Legal Reviewer')
  const [step, setStep] = useState(0)
  const [instrumentId, setInstrumentId] = useState(searchParams.get('instrument') ?? instruments[0]?.id ?? '')
  const [tester, setTester] = useState(testers[0]?.name ?? '')
  const [reviewer, setReviewer] = useState(reviewers[0]?.name ?? '')
  const [purpose, setPurpose] = useState('Initial Verification')
  const [testDate, setTestDate] = useState(localDateString())
  const [applicant, setApplicant] = useState('')
  const [conditions, setConditions] = useState({ temperature: '', relativeHumidity: '', atmosphericPressure: '', referenceStandards: '' })

  const instrument = instruments.find((i) => i.id === instrumentId)
  const isLast = step === STEPS.length - 1
  const canContinue = (step !== 0 || Boolean(instrument)) && (step !== 2 || Object.values(conditions).every((value) => value.trim() !== '')) && (step !== 3 || testers.length > 0) && (step !== 4 || reviewers.length > 0)

  function next() {
    if (isLast) {
      if (!instrument || !tester || !reviewer) return
      const id = addEvaluation({
        instrumentId: instrument.id,
        instrumentSerial: instrument.serial,
        instrumentType: instrument.type,
        manufacturer: instrument.manufacturer,
        model: instrument.model,
        lab: instrument.lab,
        tester,
        reviewer,
        createdDate: localDateString(),
        purpose,
        applicant: applicant.trim() || instrument.owner,
        testDate,
        ...conditions,
      })
      navigate(`/testing?evaluation=${encodeURIComponent(id)}`)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  return (
    <div className="space-y-6">
      <WorkflowStepper title="New Evaluation" subtitle="Follow each step to create and assign a new evaluation" steps={STEPS} currentIndex={step} />

      {step === 0 && (
        <FormSection title="Select Instrument" description="Choose the registered instrument to be evaluated">
          <Field label="Instrument" full>
            <SelectInput value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)} required>
              {instruments.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.id} — {i.manufacturer} {i.model} ({i.serial})
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Instrument Type">
            <TextInput value={instrument?.type ?? ''} disabled />
          </Field>
          <Field label="Laboratory">
            <TextInput value={instrument?.lab ?? ''} disabled />
          </Field>
        </FormSection>
      )}

      {step === 1 && (
        <FormSection title="Evaluation Details" description="Identification and purpose of this evaluation">
          <Field label="Evaluation ID" hint="Auto-generated on creation">
            <TextInput value="Generated when you begin testing" disabled />
          </Field>
          <Field label="Purpose">
            <SelectInput value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              {['Initial Verification', 'Periodic Verification', 'Repair Verification'].map((item) => <option key={item}>{item}</option>)}
            </SelectInput>
          </Field>
          <Field label="Test Date">
            <TextInput type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)} required />
          </Field>
          <Field label="Applicant">
            <TextInput value={applicant} onChange={(e) => setApplicant(e.target.value)} placeholder={instrument?.owner} />
          </Field>
        </FormSection>
      )}

      {step === 2 && (
        <FormSection title="Laboratory Conditions" description="Environmental conditions recorded at the time of testing">
          <Field label="Temperature (°C)">
            <TextInput value={conditions.temperature} onChange={(e) => setConditions((v) => ({ ...v, temperature: e.target.value }))} type="number" step="0.1" placeholder="e.g. 23.5" required />
          </Field>
          <Field label="Relative Humidity (%)">
            <TextInput value={conditions.relativeHumidity} onChange={(e) => setConditions((v) => ({ ...v, relativeHumidity: e.target.value }))} type="number" min="0" max="100" step="0.1" placeholder="e.g. 52" required />
          </Field>
          <Field label="Atmospheric Pressure (hPa)">
            <TextInput value={conditions.atmosphericPressure} onChange={(e) => setConditions((v) => ({ ...v, atmosphericPressure: e.target.value }))} type="number" step="0.1" placeholder="e.g. 1013" required />
          </Field>
          <Field label="Reference Standards Used">
            <TextInput value={conditions.referenceStandards} onChange={(e) => setConditions((v) => ({ ...v, referenceStandards: e.target.value }))} placeholder="e.g. OIML Class F1 weight set" required />
          </Field>
        </FormSection>
      )}

      {step === 3 && (
        <FormSection title="Assign Testing Technician" description="Select the testing technician responsible for performing this evaluation">
          <Field label="Testing Technician" full>
            <SelectInput value={tester} onChange={(e) => setTester(e.target.value)}>
              {testers.map((t) => (
                <option key={t.id}>{t.name}</option>
              ))}
            </SelectInput>
          </Field>
        </FormSection>
      )}

      {step === 4 && (
        <FormSection title="Assign Legal Reviewer" description="Select the legal reviewer who will verify and approve this evaluation">
          <Field label="Legal Reviewer" full hint="A testing technician cannot be assigned as the legal reviewer for their own evaluation">
            <SelectInput value={reviewer} onChange={(e) => setReviewer(e.target.value)}>
              {reviewers.map((r) => (
                <option key={r.id}>{r.name}</option>
              ))}
            </SelectInput>
          </Field>
        </FormSection>
      )}

      {step === 5 && (
        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Ready to Begin Testing</h3>
          <p className="mt-0.5 text-xs text-ink-500">Review the summary below, then begin the testing workspace.</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ['Instrument', instrument ? `${instrument.manufacturer} ${instrument.model} (${instrument.serial})` : 'Select an instrument'],
              ['Laboratory', instrument?.lab ?? '—'],
              ['Purpose', purpose],
              ['Test date', testDate],
              ['Applicant', applicant || instrument?.owner || '—'],
              ['Testing Technician', tester],
              ['Legal Reviewer', reviewer],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-ink-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={next} disabled={!canContinue || (isLast && (!instrument || !tester || !reviewer))}>{isLast ? 'Begin Testing' : 'Next'}</Button>
      </div>
    </div>
  )
}
