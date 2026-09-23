import { BookOpenCheck } from 'lucide-react'
import { oimlRuleCategories } from '../data/mockData'
import { StatusBadge } from '../components/ui/StatusBadge'

export function OimlRules() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <BookOpenCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-ink-900">OIML R-76 — Non-Automatic Weighing Instruments</h2>
          <p className="mt-0.5 text-xs text-ink-500">Current Version: R-76-1:2006 (Rev. 2020) · Status: Active · Last updated 2026-01-10</p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-white shadow-card">
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
                <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-900">{rule.category}</td>
                <td className="max-w-xs px-5 py-3.5 text-sm text-ink-600">{rule.description}</td>
                <td className="max-w-xs px-5 py-3.5 text-xs text-ink-400">{rule.mpeReference}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{rule.version}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <StatusBadge status={rule.status === 'Active' ? 'Approved' : 'Draft'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
