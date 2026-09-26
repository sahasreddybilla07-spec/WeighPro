import { UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../../context/AppDataContext'
import { Button } from '../../components/ui/Button'
import { Field, FormSection, SelectInput, TextInput } from '../../components/ui/FormSection'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'
import { localDateString } from '../../lib/utils'

const STEPS = ['Manufacturer', 'Instrument Details', 'Technical Specifications', 'Location & Ownership', 'Documents', 'Review & Confirm']

const INSTRUMENT_TYPES = ['Electronic Platform Scale', 'Precision Balance', 'Weighbridge', 'Retail Counter Scale', 'Industrial Bench Scale']
const ACCURACY_CLASSES = ['Class I', 'Class II', 'Class III', 'Class IIII']
const LABORATORIES = [
  'Regional Reference Standards Laboratory, Bengaluru',
  'National Test House, Kolkata',
  'State Reference Standards Laboratory, Pune',
  'Legal Metrology Laboratory, Chennai',
  'Regional Reference Standards Laboratory, Faridabad',
]

interface InstrumentDraft {
  manufacturerName: string
  manufacturerAddress: string
  instrumentType: string
  model: string
  serialNumber: string
  capacity: string
  scaleInterval: string
  accuracyClass: string
  location: string
  owner: string
  laboratory: string
  registrationDate: string
}

const INITIAL_DRAFT: InstrumentDraft = {
  manufacturerName: '',
  manufacturerAddress: '',
  instrumentType: '',
  model: '',
  serialNumber: '',
  capacity: '',
  scaleInterval: '',
  accuracyClass: '',
  location: '',
  owner: '',
  laboratory: LABORATORIES[0],
  registrationDate: '',
}

// Which fields must be filled before "Next" unlocks, per step.
const REQUIRED_FIELDS: (keyof InstrumentDraft)[][] = [
  ['manufacturerName'],
  ['instrumentType', 'model', 'serialNumber'],
  ['capacity', 'scaleInterval', 'accuracyClass'],
  [],
  [],
  [],
]

const REVIEW_ROWS: [string, keyof InstrumentDraft][] = [
  ['Manufacturer Name', 'manufacturerName'],
  ['Manufacturer Address', 'manufacturerAddress'],
  ['Instrument Type', 'instrumentType'],
  ['Model', 'model'],
  ['Serial Number', 'serialNumber'],
  ['Capacity (Max)', 'capacity'],
  ['Verification Scale Interval (e)', 'scaleInterval'],
  ['Accuracy Class', 'accuracyClass'],
  ['Location', 'location'],
  ['Owner / Applicant', 'owner'],
  ['Laboratory', 'laboratory'],
  ['Registration Date', 'registrationDate'],
]

export function NewInstrument() {
  const navigate = useNavigate()
  const { addInstrument } = useAppData()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<InstrumentDraft>(INITIAL_DRAFT)
  const [files, setFiles] = useState<File[]>([])

  const isLast = step === STEPS.length - 1
  const canAdvance = REQUIRED_FIELDS[step].every((key) => draft[key].trim() !== '')

  function set<K extends keyof InstrumentDraft>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setDraft((d) => ({ ...d, [key]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addInstrument({
      serial: draft.serialNumber.trim(),
      manufacturer: draft.manufacturerName.trim(),
      manufacturerAddress: draft.manufacturerAddress.trim(),
      model: draft.model.trim(),
      type: draft.instrumentType,
      status: 'Active',
      capacity: draft.capacity.trim(),
      scaleInterval: draft.scaleInterval.trim(),
      accuracyClass: draft.accuracyClass,
      location: draft.location.trim() || 'Not specified',
      lab: draft.laboratory,
      owner: draft.owner.trim() || 'Not specified',
      registrationDate: draft.registrationDate || localDateString(),
      documents: files.map((file) => file.name),
    })
    navigate('/instruments')
  }

  function next() {
    if (isLast) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <WorkflowStepper
        title="Register Instrument"
        subtitle="Follow each step to add a new NAWI to the registry"
        steps={STEPS}
        currentIndex={step}
      />

      {step === 0 && (
        <FormSection title="Manufacturer Details" description="Details of the instrument's manufacturer">
          <Field label="Manufacturer Name">
            <TextInput placeholder="e.g. Avery Weigh-Tronix" value={draft.manufacturerName} onChange={set('manufacturerName')} required />
          </Field>
          <Field label="Manufacturer Address">
            <TextInput placeholder="City, State" value={draft.manufacturerAddress} onChange={set('manufacturerAddress')} />
          </Field>
        </FormSection>
      )}

      {step === 1 && (
        <FormSection title="Instrument Details" description="Core identification for the instrument being registered">
          <Field label="Instrument ID" hint="Auto-generated on save">
            <TextInput placeholder="INST-0041" disabled />
          </Field>
          <Field label="Instrument Type">
            <SelectInput value={draft.instrumentType} onChange={set('instrumentType')} required>
              <option value="">Select type…</option>
              {INSTRUMENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Model">
            <TextInput placeholder="e.g. ABC-100" value={draft.model} onChange={set('model')} required />
          </Field>
          <Field label="Serial Number">
            <TextInput placeholder="e.g. NW-24501" value={draft.serialNumber} onChange={set('serialNumber')} required />
          </Field>
        </FormSection>
      )}

      {step === 2 && (
        <FormSection title="Technical Specifications" description="Metrological parameters used for OIML R-76 evaluation">
          <Field label="Capacity (Max)">
            <TextInput placeholder="e.g. 150 kg" value={draft.capacity} onChange={set('capacity')} required />
          </Field>
          <Field label="Verification Scale Interval (e)">
            <TextInput placeholder="e.g. 0.05 kg" value={draft.scaleInterval} onChange={set('scaleInterval')} required />
          </Field>
          <Field label="Accuracy Class">
            <SelectInput value={draft.accuracyClass} onChange={set('accuracyClass')} required>
              <option value="">Select class…</option>
              {ACCURACY_CLASSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </SelectInput>
          </Field>
        </FormSection>
      )}

      {step === 3 && (
        <FormSection title="Location &amp; Ownership" description="Where the instrument is installed and who is responsible for it">
          <Field label="Location">
            <TextInput placeholder="e.g. Bay 2, Testing Floor" value={draft.location} onChange={set('location')} />
          </Field>
          <Field label="Owner / Applicant">
            <TextInput placeholder="e.g. Sri Ganesh Traders" value={draft.owner} onChange={set('owner')} />
          </Field>
          <Field label="Laboratory">
            <SelectInput value={draft.laboratory} onChange={set('laboratory')}>
              {LABORATORIES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Registration Date">
            <TextInput type="date" value={draft.registrationDate} onChange={set('registrationDate')} />
          </Field>
        </FormSection>
      )}

      {step === 4 && (
        <FormSection title="Supporting Documents" description="Attach photographs or manufacturer certificates">
          <div className="sm:col-span-2">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 px-6 py-8 text-center">
              <UploadCloud className="h-6 w-6 text-ink-400" />
              <label className="cursor-pointer text-sm font-medium text-ink-700">Choose supporting documents<input className="sr-only" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setFiles((current) => [...current, ...Array.from(event.target.files ?? [])])} /></label>
              <p className="text-xs text-ink-400">Instrument photos and manufacturer certificates (PDF, JPG, PNG)</p>
              {files.length > 0 && <ul className="mt-2 space-y-1 text-xs text-ink-600">{files.map((file, index) => <li key={`${file.name}-${index}`}>{file.name} · {(file.size / 1024).toFixed(0)} KB</li>)}</ul>}
            </div>
          </div>
        </FormSection>
      )}

      {step === 5 && (
        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Review &amp; Confirm</h3>
          <p className="mt-0.5 text-xs text-ink-500">Check the details below before registering this instrument.</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {REVIEW_ROWS.map(([label, key]) => (
              <div key={key} className="rounded-lg bg-ink-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink-900">{draft[key] || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={() => (step === 0 ? navigate('/instruments') : setStep((s) => s - 1))}>
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        {isLast ? (
          <Button key="submit" type="submit">
            Register Instrument
          </Button>
        ) : (
          <Button key="next" type="button" onClick={next} disabled={!canAdvance}>
            Next
          </Button>
        )}
      </div>
    </form>
  )
}
