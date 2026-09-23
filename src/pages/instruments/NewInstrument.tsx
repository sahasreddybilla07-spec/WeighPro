import { UploadCloud } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Field, FormSection, SelectInput, TextInput } from '../../components/ui/FormSection'

export function NewInstrument() {
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/instruments')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="Manufacturer Details" description="Details of the instrument's manufacturer">
        <Field label="Manufacturer Name">
          <TextInput placeholder="e.g. Avery Weigh-Tronix" required />
        </Field>
        <Field label="Manufacturer Address">
          <TextInput placeholder="City, State" />
        </Field>
      </FormSection>

      <FormSection title="Instrument Details" description="Core identification for the instrument being registered">
        <Field label="Instrument ID" hint="Auto-generated on save">
          <TextInput placeholder="INST-0041" disabled />
        </Field>
        <Field label="Instrument Type">
          <SelectInput required>
            <option value="">Select type…</option>
            <option>Electronic Platform Scale</option>
            <option>Precision Balance</option>
            <option>Weighbridge</option>
            <option>Retail Counter Scale</option>
            <option>Industrial Bench Scale</option>
          </SelectInput>
        </Field>
        <Field label="Model">
          <TextInput placeholder="e.g. ABC-100" required />
        </Field>
        <Field label="Serial Number">
          <TextInput placeholder="e.g. NW-24501" required />
        </Field>
      </FormSection>

      <FormSection title="Technical Specifications" description="Metrological parameters used for OIML R-76 evaluation">
        <Field label="Capacity (Max)">
          <TextInput placeholder="e.g. 150 kg" required />
        </Field>
        <Field label="Verification Scale Interval (e)">
          <TextInput placeholder="e.g. 0.05 kg" required />
        </Field>
        <Field label="Accuracy Class">
          <SelectInput required>
            <option value="">Select class…</option>
            <option>Class I</option>
            <option>Class II</option>
            <option>Class III</option>
            <option>Class IIII</option>
          </SelectInput>
        </Field>
      </FormSection>

      <FormSection title="Location &amp; Ownership" description="Where the instrument is installed and who is responsible for it">
        <Field label="Location">
          <TextInput placeholder="e.g. Bay 2, Testing Floor" />
        </Field>
        <Field label="Owner / Applicant">
          <TextInput placeholder="e.g. Sri Ganesh Traders" />
        </Field>
        <Field label="Laboratory">
          <SelectInput>
            <option>Regional Reference Standards Laboratory, Bengaluru</option>
            <option>National Test House, Kolkata</option>
            <option>State Reference Standards Laboratory, Pune</option>
            <option>Legal Metrology Laboratory, Chennai</option>
            <option>Regional Reference Standards Laboratory, Faridabad</option>
          </SelectInput>
        </Field>
        <Field label="Registration Date">
          <TextInput type="date" />
        </Field>
      </FormSection>

      <FormSection title="Supporting Documents" description="Attach photographs or manufacturer certificates">
        <div className="sm:col-span-2">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 px-6 py-8 text-center">
            <UploadCloud className="h-6 w-6 text-ink-400" />
            <p className="text-sm font-medium text-ink-700">Drag files here, or click to browse</p>
            <p className="text-xs text-ink-400">Instrument photos, manufacturer certificates (PDF, JPG, PNG)</p>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => navigate('/instruments')}>
          Cancel
        </Button>
        <Button type="submit">Register Instrument</Button>
      </div>
    </form>
  )
}
