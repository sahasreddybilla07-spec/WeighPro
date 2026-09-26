import { BookOpenCheck } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { SelectInput, TextInput } from '../components/ui/FormSection'
import { useEffect, useState } from 'react'

export function OimlRules() {
  const { data, updateRule } = useAppData()
  const oimlRuleCategories = data.rules
  const [drafts, setDrafts] = useState<Record<string, { description: string; mpeReference: string; version: string; status: 'Active' | 'Draft' }>>({})

  useEffect(() => {
    setDrafts(Object.fromEntries(oimlRuleCategories.map((rule) => [rule.category, { description: rule.description, mpeReference: rule.mpeReference, version: rule.version, status: rule.status }])))
  }, [])
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-surface p-5 shadow-card">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <BookOpenCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-ink-900">OIML R-76 — Non-Automatic Weighing Instruments</h2>
          <p className="mt-0.5 text-xs text-ink-500">Current Version: R-76-1:2006 (Rev. 2020) · Status: Active · Last updated 2026-01-10</p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-surface shadow-card">
        <div className="border-b border-ink-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-ink-900">Applicable Test Categories</h3>
          <p className="mt-0.5 text-xs text-ink-500">Reference structure only — full MPE tables will be digitized in a future release.</p>
        </div>
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Test Category', 'Description', 'MPE Reference', 'Version', 'Status'].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {oimlRuleCategories.map((rule) => (
              <tr key={rule.category}>
                {(() => {
                  const draft = drafts[rule.category] ?? rule
                  const change = (key: keyof typeof draft, value: string) => setDrafts((current) => ({ ...current, [rule.category]: { ...draft, [key]: value } }))
                  const save = () => updateRule(rule.category, draft)
                  return <>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-900">{rule.category}</td>
                <td className="min-w-[240px] px-3 py-2"><TextInput aria-label={`${rule.category} description`} value={draft.description} onChange={(event) => change('description', event.target.value)} onBlur={save} /></td>
                <td className="min-w-[260px] px-3 py-2"><TextInput aria-label={`${rule.category} MPE reference`} value={draft.mpeReference} onChange={(event) => change('mpeReference', event.target.value)} onBlur={save} /></td>
                <td className="min-w-[190px] px-3 py-2"><TextInput aria-label={`${rule.category} version`} value={draft.version} onChange={(event) => change('version', event.target.value)} onBlur={save} /></td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <SelectInput aria-label={`${rule.category} status`} className="w-28" value={draft.status} onChange={(event) => { change('status', event.target.value); updateRule(rule.category, { status: event.target.value as 'Active' | 'Draft' }) }}>
                    <option>Active</option><option>Draft</option>
                  </SelectInput>
                </td>
                  </>
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
