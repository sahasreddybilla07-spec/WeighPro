import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { instruments } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Field, FormSection, SelectInput, TextInput } from '../../components/ui/FormSection'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'

const STEPS = ['Select Instrument', 'Evaluation Details', 'Lab Conditions', 'Assign Tester', 'Assign Reviewer', 'Begin Testing']

const TESTERS = ['Ananya Sharma', 'Rohit Verma', 'Divya Nair', 'Karthik Iyer', 'Meera Pillai']
const REVIEWERS = ['Suresh Menon', 'Arjun Rao', 'Kavita Rangan']

export function NewEvaluation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [instrumentId, setInstrumentId] = useState(instruments[0].id)
  const [tester, setTester] = useState(TESTERS[0])
  const [reviewer, setReviewer] = useState(REVIEWERS[0])

  const instrument = instruments.find((i) => i.id === instrumentId) ?? instruments[0]
  const isLast = step === STEPS.length - 1

  function next() {
    if (isLast) {
      navigate('/testing')
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
            <SelectInput value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)}>
              {instruments.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.id} — {i.manufacturer} {i.model} ({i.serial})
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Instrument Type">
            <TextInput value={instrument.type} disabled />
          </Field>
          <Field label="Laboratory">
            <TextInput value={instrument.lab} disabled />
          </Field>
        </FormSection>
      )}

      {step === 1 && (
        <FormSection title="Evaluation Details" description="Identification and purpose of this evaluation">
          <Field label="Evaluation ID" hint="Auto-generated on creation">
            <TextInput value="EV-2026-0143" disabled />
          </Field>
          <Field label="Purpose">
            <SelectInput defaultValue="Initial Verification">
              <option>Initial Verification</option>
              <option>Periodic Verification</option>
              <option>Repair Verification</option>
            </SelectInput>
          </Field>
          <Field label="Test Date">
            <TextInput type="date" defaultValue="2026-09-23" />
          </Field>
          <Field label="Applicant">
            <TextInput placeholder={instrument.owner} />
          </Field>
        </FormSection>
      )}

      {step === 2 && (
        <FormSection title="Laboratory Conditions" description="Environmental conditions recorded at the time of testing">
          <Field label="Temperature (°C)">
            <TextInput placeholder="e.g. 23.5" />
          </Field>
          <Field label="Relative Humidity (%)">
            <TextInput placeholder="e.g. 52" />
          </Field>
          <Field label="Atmospheric Pressure (hPa)">
            <TextInput placeholder="e.g. 1013" />
          </Field>
          <Field label="Reference Standards Used">
            <TextInput placeholder="e.g. OIML Class F1 weight set" />
          </Field>
        </FormSection>
      )}

      {step === 3 && (
        <FormSection title="Assign Tester" description="Select the tester responsible for performing this evaluation">
          <Field label="Tester" full>
            <SelectInput value={tester} onChange={(e) => setTester(e.target.value)}>
              {TESTERS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </SelectInput>
          </Field>
        </FormSection>
      )}

      {step === 4 && (
        <FormSection title="Assign Reviewer" description="Select the reviewer who will verify and approve this evaluation">
          <Field label="Reviewer" full hint="A tester cannot be assigned as the reviewer for their own evaluation">
            <SelectInput value={reviewer} onChange={(e) => setReviewer(e.target.value)}>
              {REVIEWERS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </SelectInput>
          </Field>
        </FormSection>
      )}

      {step === 5 && (
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Ready to Begin Testing</h3>
          <p className="mt-0.5 text-xs text-ink-500">Review the summary below, then begin the testing workspace.</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ['Instrument', `${instrument.manufacturer} ${instrument.model} (${instrument.serial})`],
              ['Laboratory', instrument.lab],
              ['Tester', tester],
              ['Reviewer', reviewer],
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
        <Button onClick={next}>{isLast ? 'Begin Testing' : 'Next'}</Button>
      </div>
    </div>
  )
}
