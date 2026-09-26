import { CheckCircle2, FileText, Image as ImageIcon, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { allEvaluations, weighingPerformanceObservations } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { TextArea } from '../../components/ui/FormSection'
import { CalculationExplainer } from '../../components/testing/CalculationExplainer'

export function EvaluationDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const evaluation = allEvaluations.find((e) => e.id === id) ?? allEvaluations[0]
  const [comment, setComment] = useState('')
  const [decision, setDecision] = useState<'approved' | 'returned' | null>(null)

  const isReviewer = user?.role === 'reviewer' || user?.role === 'manager'
  const isOwnEvaluation = user?.role === 'tester' && evaluation.tester === user.name
  const canDecide = isReviewer && !decision && (evaluation.status === 'Under Review' || evaluation.status === 'Submitted')

  // Illustrative observation data. When this evaluation's own tests are fully
  // recorded, show completed placeholder readings instead of the sample's
  // still-pending rows so the table doesn't contradict the header count.
  const isFullyTested = evaluation.testsCompleted >= evaluation.testsTotal
  const observations = weighingPerformanceObservations.map((row, idx) =>
    isFullyTested && row.result === 'NOT TESTED'
      ? { ...row, indicated: row.testLoad.replace(/(\d+\.\d+)/, (n) => (parseFloat(n) + 0.002 + idx * 0.001).toFixed(3)), error: '+0.002 kg', result: 'PASS' as const }
      : row,
  )

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-mono text-lg font-bold text-ink-900">{evaluation.id}</h2>
              <StatusBadge status={decision === 'approved' ? 'Approved' : decision === 'returned' ? 'Correction Required' : evaluation.status} />
              <StatusBadge status={evaluation.result} />
            </div>
            <p className="mt-1 text-sm text-ink-600">{evaluation.manufacturer} {evaluation.model} · Serial {evaluation.instrumentSerial}</p>
            <p className="mt-0.5 text-xs text-ink-400">{evaluation.lab}</p>
          </div>
          {isOwnEvaluation && evaluation.status === 'Testing' && (
            <Button onClick={() => navigate('/testing')}>Continue Testing</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Instrument Information</h3>
          <dl className="mt-4 space-y-3">
            {[
              ['Type', evaluation.instrumentType],
              ['Manufacturer', evaluation.manufacturer],
              ['Model', evaluation.model],
              ['Serial Number', evaluation.instrumentSerial],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-ink-100 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-ink-500">{label}</dt>
                <dd className="text-sm font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Testing Technician &amp; Legal Reviewer Information</h3>
          <dl className="mt-4 space-y-3">
            {[
              ['Testing Technician', evaluation.tester],
              ['Legal Reviewer', evaluation.reviewer],
              ['Created', evaluation.createdDate],
              ['Submitted', evaluation.submittedDate ?? 'Not yet submitted'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-ink-100 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-ink-500">{label}</dt>
                <dd className="text-sm font-medium text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-surface shadow-card">
        <div className="border-b border-ink-100 px-6 py-4">
          <h3 className="text-sm font-semibold text-ink-900">Test Observations &amp; OIML Compliance Result</h3>
          <p className="mt-0.5 text-xs text-ink-500">Weighing performance summary ({evaluation.testsCompleted}/{evaluation.testsTotal} tests recorded)</p>
        </div>
        <div className="px-6 py-4">
          <CalculationExplainer
            formula="Error = Indicated Value − Test Load"
            passCondition="PASS when |Error| ≤ Permissible Error (MPE)"
          />
        </div>
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Test Load', 'Indicated Value', 'Error', 'Permissible Error (MPE)', 'Result'].map((col) => (
                <th key={col} className="whitespace-nowrap px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {observations.map((row) => (
              <tr key={row.testLoad}>
                <td className="whitespace-nowrap px-6 py-3 font-mono text-sm text-ink-800">{row.testLoad}</td>
                <td className="whitespace-nowrap px-6 py-3 font-mono text-sm text-ink-800">{row.indicated}</td>
                <td className="whitespace-nowrap px-6 py-3 font-mono text-sm text-ink-600">{row.error}</td>
                <td className="whitespace-nowrap px-6 py-3 font-mono text-sm text-ink-600">{row.mpe}</td>
                <td className="whitespace-nowrap px-6 py-3">
                  <StatusBadge status={row.result} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
        <h3 className="text-sm font-semibold text-ink-900">Evidence &amp; Documents</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1.5 text-xs text-ink-600">
            <ImageIcon className="h-3.5 w-3.5 text-ink-400" /> instrument_setup.jpg
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1.5 text-xs text-ink-600">
            <FileText className="h-3.5 w-3.5 text-ink-400" /> observation_sheet.pdf
          </span>
        </div>
      </div>

      {isReviewer && (
        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">Legal Reviewer Decision</h3>
          <p className="mt-0.5 text-xs text-ink-500">A testing technician cannot approve their own evaluation — only legal reviewers and lab managers can decide here.</p>
          <TextArea
            className="mt-4"
            rows={3}
            placeholder="Add review comments (optional)…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!canDecide}
          />
          {decision ? (
            <div
              className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
                decision === 'approved' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
              }`}
            >
              {decision === 'approved' ? <CheckCircle2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
              {decision === 'approved' ? 'Evaluation approved and sent to report generation.' : 'Evaluation returned to the tester for correction.'}
            </div>
          ) : (
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="secondary" disabled={!canDecide} onClick={() => setDecision('returned')}>
                <RotateCcw className="h-4 w-4" />
                Request Correction
              </Button>
              <Button disabled={!canDecide} onClick={() => setDecision('approved')}>
                <CheckCircle2 className="h-4 w-4" />
                Approve Evaluation
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
