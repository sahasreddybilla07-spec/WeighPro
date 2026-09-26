import { CheckCircle2, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { getEvaluationMeasurements, useAppData } from '../../context/AppDataContext'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { TextArea } from '../../components/ui/FormSection'
import { CalculationExplainer } from '../../components/testing/CalculationExplainer'
import { localDateString } from '../../lib/utils'

export function EvaluationDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { data, updateEvaluation } = useAppData()
  const navigate = useNavigate()
  const evaluation = data.evaluations.find((e) => e.id === id)
  const [comment, setComment] = useState('')

  if (!evaluation) return <div className="rounded-xl border border-ink-200 bg-surface p-8 text-center text-sm text-ink-500">Evaluation not found.</div>
  const currentEvaluation = evaluation

  const isReviewer = user?.role === 'reviewer' && currentEvaluation.reviewer === user.name
  const isDirector = user?.role === 'admin'
  const isOwnEvaluation = user?.role === 'tester' && currentEvaluation.tester === user.name
  const canDecide = isReviewer && (currentEvaluation.status === 'Under Review' || currentEvaluation.status === 'Submitted') && currentEvaluation.testsCompleted >= currentEvaluation.testsTotal && (currentEvaluation.result === 'PASS' || currentEvaluation.result === 'FAIL')
  const canFinalize = isDirector && currentEvaluation.status === 'Approved'

  const observations = getEvaluationMeasurements(data, evaluation.id).weighing

  function decide(decision: 'approve' | 'return') {
    const reviewedDate = localDateString()
    updateEvaluation(currentEvaluation.id, decision === 'approve'
      ? { status: 'Approved', result: currentEvaluation.result, reviewedDate, reviewerComments: comment }
      : { status: 'Correction Required', result: currentEvaluation.result === 'NOT TESTED' ? 'PENDING' : currentEvaluation.result, reviewedDate, reviewerComments: comment })
  }

  function finalize() {
    updateEvaluation(currentEvaluation.id, { status: 'Completed', reviewedDate: localDateString(), director: user?.name })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-mono text-lg font-bold text-ink-900">{evaluation.id}</h2>
              <StatusBadge status={evaluation.status} />
              <StatusBadge status={evaluation.result} />
            </div>
            <p className="mt-1 text-sm text-ink-600">{evaluation.manufacturer} {evaluation.model} · Serial {evaluation.instrumentSerial}</p>
            <p className="mt-0.5 text-xs text-ink-400">{evaluation.lab}</p>
          </div>
          {isOwnEvaluation && evaluation.status === 'Testing' && (
            <Button onClick={() => navigate(`/testing?evaluation=${encodeURIComponent(evaluation.id)}`)}>Continue Testing</Button>
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
              ['Purpose', evaluation.purpose ?? '—'],
              ['Test date', evaluation.testDate ?? '—'],
              ['Applicant', evaluation.applicant ?? '—'],
              ['Temperature', evaluation.temperature ? `${evaluation.temperature} °C` : '—'],
              ['Relative humidity', evaluation.relativeHumidity ? `${evaluation.relativeHumidity} %` : '—'],
              ['Reference standard', evaluation.referenceStandards ?? '—'],
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
        <p className="mt-3 text-sm text-ink-500">No evidence files attached to this evaluation.</p>
      </div>

      {(isReviewer || isDirector) && (
        <div className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold text-ink-900">{isDirector ? 'Director Final Approval' : 'Legal Reviewer Decision'}</h3>
          <p className="mt-0.5 text-xs text-ink-500">{isDirector ? 'Finalize the reviewer-approved evaluation for release.' : 'Review the submitted test record before forwarding it for director approval.'}</p>
          <TextArea
            className="mt-4"
            rows={3}
            placeholder="Add review comments (optional)…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isDirector ? !canFinalize : !canDecide}
          />
            {isDirector && evaluation.status === 'Approved' ? (
              <div className="mt-4 flex justify-end"><Button onClick={finalize}><CheckCircle2 className="h-4 w-4" />Approve Final Report</Button></div>
            ) : isDirector ? (
              <p className="mt-4 text-sm text-ink-500">{evaluation.status === 'Completed' ? 'Final approval recorded.' : 'Waiting for reviewer approval.'}</p>
            ) : evaluation.status === 'Approved' || evaluation.status === 'Correction Required' || evaluation.status === 'Completed' ? (
              <div
                className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
                  evaluation.status === 'Approved' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
                }`}
              >
                {evaluation.status === 'Approved' ? <CheckCircle2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                {evaluation.status === 'Approved' ? 'Reviewer approved. Awaiting director final approval.' : evaluation.status === 'Completed' ? 'Final report approved by the director.' : 'Evaluation returned to the tester for correction.'}
                {evaluation.reviewerComments && <span className="ml-2">{evaluation.reviewerComments}</span>}
            </div>
          ) : (
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="secondary" disabled={!canDecide} onClick={() => decide('return')}>
                <RotateCcw className="h-4 w-4" />
                Request Correction
              </Button>
              <Button disabled={!canDecide} onClick={() => decide('approve')}>
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
