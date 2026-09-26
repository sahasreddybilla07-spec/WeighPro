import { Download } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { allEvaluations } from '../data/mockData'
import { BrandLockup } from '../components/ui/BrandLockup'
import { Button } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/StatusBadge'

export function ReportPreview() {
  const { id } = useParams()
  const evaluation = allEvaluations.find((e) => e.id === id) ?? allEvaluations.find((e) => e.status === 'Approved' || e.status === 'Completed') ?? allEvaluations[0]
  const isFinal = evaluation.status === 'Completed'

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-surface p-10 shadow-card print:border-0 print:shadow-none">
        <div className="flex items-start justify-between border-b border-ink-200 pb-6">
          <BrandLockup size="sm" />
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Report ID</p>
            <p className="font-mono text-sm font-bold text-ink-900">RPT-{evaluation.id.replace('EV-', '')}</p>
            <StatusBadge status={isFinal ? 'Final' : 'Draft'} className="mt-2" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-lg font-bold text-ink-900">NAWI Test Report — OIML R-76 Compliance Evaluation</h1>
        <p className="mt-1 text-center text-xs text-ink-400">Non-Automatic Weighing Instrument Testing &amp; Certification</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Instrument Information</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink-500">Type</dt><dd className="font-medium text-ink-900">{evaluation.instrumentType}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Manufacturer</dt><dd className="font-medium text-ink-900">{evaluation.manufacturer}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Model</dt><dd className="font-medium text-ink-900">{evaluation.model}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Serial Number</dt><dd className="font-mono font-medium text-ink-900">{evaluation.instrumentSerial}</dd></div>
            </dl>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Laboratory Information</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink-500">Laboratory</dt><dd className="font-medium text-ink-900">{evaluation.lab.split(',')[0]}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Evaluation ID</dt><dd className="font-mono font-medium text-ink-900">{evaluation.id}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Date</dt><dd className="font-medium text-ink-900">{evaluation.reviewedDate ?? evaluation.submittedDate ?? evaluation.createdDate}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">OIML Reference</dt><dd className="font-medium text-ink-900">R-76-1:2006 (Rev. 2020)</dd></div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Test Results Summary</h3>
          <table className="mt-2 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="py-1.5 text-xs font-semibold uppercase text-ink-400">Test Category</th>
                <th className="py-1.5 text-xs font-semibold uppercase text-ink-400">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {['Weighing Performance', 'Repeatability', 'Eccentric Loading'].map((cat) => (
                <tr key={cat}>
                  <td className="py-2 text-ink-800">{cat}</td>
                  <td className="py-2"><StatusBadge status={evaluation.result === 'FAIL' ? 'FAIL' : 'PASS'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-ink-50 px-5 py-4">
          <p className="text-sm font-semibold text-ink-900">Overall Compliance Result</p>
          <StatusBadge status={evaluation.result} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink-200 pt-6 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Testing Technician</p>
            <p className="mt-1 font-medium text-ink-900">{evaluation.tester}</p>
            <div className="mt-6 h-10 border-b border-dashed border-ink-300" />
            <p className="mt-1 text-xs text-ink-400">Signature</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Legal Reviewer / Approving Officer</p>
            <p className="mt-1 font-medium text-ink-900">{evaluation.reviewer}</p>
            <div className="mt-6 h-10 border-b border-dashed border-ink-300" />
            <p className="mt-1 text-xs text-ink-400">Signature</p>
          </div>
        </div>
      </div>
    </div>
  )
}
