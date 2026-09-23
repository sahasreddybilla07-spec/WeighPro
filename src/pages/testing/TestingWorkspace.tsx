import { useState } from 'react'
import { allEvaluations } from '../../data/mockData'
import { Tabs } from '../../components/ui/Tabs'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { WeighingPerformanceTab } from './tabs/WeighingPerformanceTab'
import { RepeatabilityTab } from './tabs/RepeatabilityTab'
import { EccentricLoadingTab } from './tabs/EccentricLoadingTab'
import { OtherTestsTab } from './tabs/OtherTestsTab'
import { ResultsTab } from './tabs/ResultsTab'
import { SummaryTab } from './tabs/SummaryTab'

const TABS = [
  { key: 'weighing', label: 'Weighing Performance' },
  { key: 'repeatability', label: 'Repeatability' },
  { key: 'eccentric', label: 'Eccentric Loading' },
  { key: 'other', label: 'Other Tests' },
  { key: 'results', label: 'Results' },
  { key: 'summary', label: 'Summary' },
]

export function TestingWorkspace() {
  const [tab, setTab] = useState('weighing')
  const evaluation = allEvaluations.find((e) => e.id === 'EV-2026-0138')!

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
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
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Tester</p>
              <p className="mt-0.5 font-medium text-ink-900">{evaluation.tester}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Progress</p>
              <p className="mt-0.5 font-mono font-medium text-ink-900">{evaluation.testsCompleted} / {evaluation.testsTotal} tests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-white shadow-card">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        <div className="p-5">
          {tab === 'weighing' && <WeighingPerformanceTab />}
          {tab === 'repeatability' && <RepeatabilityTab />}
          {tab === 'eccentric' && <EccentricLoadingTab />}
          {tab === 'other' && <OtherTestsTab />}
          {tab === 'results' && <ResultsTab />}
          {tab === 'summary' && <SummaryTab />}
        </div>
      </div>
    </div>
  )
}
