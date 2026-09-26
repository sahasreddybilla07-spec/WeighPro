import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../components/ui/Button'
import { Field, SelectInput, TextInput } from '../components/ui/FormSection'
import { Tabs } from '../components/ui/Tabs'

const SECTIONS = [
  { key: 'organization', label: 'Organization' },
  { key: 'preferences', label: 'User Preferences' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'reports', label: 'Report Preferences' },
  { key: 'system', label: 'System' },
  { key: 'security', label: 'Security' },
]

function Toggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked)
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-3 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        <p className="text-xs text-ink-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-brand-700' : 'bg-ink-200'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

export function Settings() {
  const { user } = useAuth()
  const [tab, setTab] = useState('organization')

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-surface shadow-card">
        <Tabs tabs={SECTIONS} active={tab} onChange={setTab} />
        <div className="p-6">
          {tab === 'organization' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Organization / Laboratory Information</h3>
              <p className="mt-0.5 text-xs text-ink-500">Core details used across reports and certificates</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Organization Name"><TextInput defaultValue="Ministry of Consumer Affairs, Food & Public Distribution" /></Field>
                <Field label="Department"><TextInput defaultValue="Department of Consumer Affairs (DoCA)" /></Field>
                <Field label="Primary Laboratory"><TextInput defaultValue={user?.laboratory ?? ''} /></Field>
                <Field label="Contact Email"><TextInput type="email" defaultValue="labops@weighmetric.gov.in" /></Field>
              </div>
            </div>
          )}

          {tab === 'preferences' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">User Preferences</h3>
              <p className="mt-0.5 text-xs text-ink-500">Personal display and workflow preferences</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Display Name"><TextInput defaultValue={user?.name ?? ''} /></Field>
                <Field label="Role"><TextInput defaultValue={user?.roleLabel ?? ''} disabled /></Field>
                <Field label="Date Format">
                  <SelectInput defaultValue="YYYY-MM-DD">
                    <option>YYYY-MM-DD</option>
                    <option>DD-MM-YYYY</option>
                    <option>MM/DD/YYYY</option>
                  </SelectInput>
                </Field>
                <Field label="Unit System">
                  <SelectInput defaultValue="Metric (kg)">
                    <option>Metric (kg)</option>
                    <option>Imperial (lb)</option>
                  </SelectInput>
                </Field>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Notification Preferences</h3>
              <div className="mt-3">
                <Toggle label="Evaluation status updates" description="Notify when an evaluation status changes" defaultChecked />
                <Toggle label="Review requests" description="Notify when an evaluation is assigned for review" defaultChecked />
                <Toggle label="Report generation" description="Notify when a report is generated and ready" defaultChecked />
                <Toggle label="Weekly summary email" description="Receive a weekly digest of lab activity" />
              </div>
            </div>
          )}

          {tab === 'reports' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Report Preferences</h3>
              <p className="mt-0.5 text-xs text-ink-500">Defaults applied when generating standardized reports</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Default Report Format">
                  <SelectInput defaultValue="PDF">
                    <option>PDF</option>
                    <option>Editable (DOCX)</option>
                  </SelectInput>
                </Field>
                <Field label="Include Photographic Evidence">
                  <SelectInput defaultValue="Yes">
                    <option>Yes</option>
                    <option>No</option>
                  </SelectInput>
                </Field>
              </div>
            </div>
          )}

          {tab === 'system' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">System Configuration</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ['Application Version', 'WeighMetric v0.9.0 (Prototype)'],
                  ['Active OIML Ruleset', 'R-76-1:2006 (Rev. 2020)'],
                  ['Environment', 'SIH Demonstration'],
                  ['Last System Update', '2026-09-18'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-ink-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-ink-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Security</h3>
              <div className="mt-3">
                <Toggle label="Two-factor authentication" description="Require a verification code at sign-in" />
                <Toggle label="Session timeout after 30 minutes" description="Automatically sign out after inactivity" defaultChecked />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
