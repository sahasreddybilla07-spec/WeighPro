import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useAuth } from '../../auth/AuthContext'
import { Tabs } from '../../components/ui/Tabs'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { WeighingPerformanceTab } from './tabs/WeighingPerformanceTab'
import { RepeatabilityTab } from './tabs/RepeatabilityTab'
import { EccentricLoadingTab } from './tabs/EccentricLoadingTab'
import { OtherTestsTab } from './tabs/OtherTestsTab'
import { ResultsTab } from './tabs/ResultsTab'
import { SummaryTab } from './tabs/SummaryTab'
import { useSearchParams } from 'react-router-dom'

const TABS = [
  { key: 'weighing', label: 'Weighing Performance' },
  { key: 'repeatability', label: 'Repeatability' },
  { key: 'eccentric', label: 'Eccentric Loading' },
  { key: 'discrimination', label: 'Discrimination' },
  { key: 'tare', label: 'Tare Balance' },
  { key: 'temperature', label: 'Temperature Variation' },
  { key: 'results', label: 'Results' },
  { key: 'summary', label: 'Summary' },
]

export function TestingWorkspace() {
  const [tab, setTab] = useState('weighing')
  const { data } = useAppData()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const requestedId = searchParams.get('evaluation')
  const evaluation = data.evaluations.find((row) => row.id === requestedId)
    ?? data.evaluations.find((row) => row.tester === user?.name && row.status === 'Testing')
    ?? data.evaluations.find((row) => row.tester === user?.name && row.status === 'Assigned')
    ?? data.evaluations.find((row) => row.status === 'Testing')

  if (!evaluation) return <div className="rounded-xl border border-ink-200 bg-surface p-8 text-center text-sm text-ink-500">There are no evaluations available for testing. Ask a lab manager to assign one.</div>

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-mono text-base font-bold text-ink-900">{evaluation.id}</h2>
              <StatusBadge status={evaluation.status} />
            </div>
            <p className="mt-1 text-sm text-ink-600">{evaluation.manufacturer} {evaluation.model} · Serial {evaluation.instrumentSerial}</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Testing Technician</p>
              <p className="mt-0.5 font-medium text-ink-900">{evaluation.tester}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Progress</p>
              <p className="mt-0.5 font-mono font-medium text-ink-900">{evaluation.testsCompleted} / {evaluation.testsTotal} tests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-surface shadow-card">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        <div className="p-5">
          {tab === 'weighing' && <WeighingPerformanceTab evaluationId={evaluation.id} onContinue={() => setTab('repeatability')} />}
          {tab === 'repeatability' && <RepeatabilityTab evaluationId={evaluation.id} onContinue={() => setTab('eccentric')} />}
          {tab === 'eccentric' && <EccentricLoadingTab evaluationId={evaluation.id} onContinue={() => setTab('discrimination')} />}
          {tab === 'discrimination' && <OtherTestsTab evaluationId={evaluation.id} testName="Discrimination Test" onContinue={() => setTab('tare')} />}
          {tab === 'tare' && <OtherTestsTab evaluationId={evaluation.id} testName="Tare Balance Effect" onContinue={() => setTab('temperature')} />}
          {tab === 'temperature' && <OtherTestsTab evaluationId={evaluation.id} testName="Temperature Variation" onContinue={() => setTab('results')} />}
          {tab === 'results' && <ResultsTab evaluationId={evaluation.id} />}
          {tab === 'summary' && <SummaryTab evaluationId={evaluation.id} />}
        </div>
      </div>
    </div>
  )
}
