import { Boxes, ClipboardCheck, ClipboardList, FilePlus2, FlaskConical, PackagePlus, ShieldAlert, ShieldCheck } from 'lucide-react'
import { PipelineBarChart } from '../../components/dashboard/shared/PipelineBarChart'
import { PendingReviewTable } from '../../components/dashboard/shared/PendingReviewTable'
import { QuickActionsCard } from '../../components/dashboard/shared/QuickActionsCard'
import type { QuickAction } from '../../components/dashboard/shared/QuickActionsCard'
import { TesterWorkloadTable } from '../../components/dashboard/manager/TesterWorkloadTable'
import { InstrumentStatusStrip } from '../../components/dashboard/manager/InstrumentStatusStrip'
import { MetricCard } from '../../components/ui/MetricCard'
import { managerMetrics, managerPipeline } from '../../data/mockData'

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Register Instrument', description: 'Add a new NAWI to the registry', icon: PackagePlus, to: '/instruments/new' },
  { label: 'Create Evaluation', description: 'Start a new compliance evaluation', icon: FilePlus2, to: '/evaluations/new' },
  { label: 'Assign Evaluation', description: 'Assign an evaluation to a tester', icon: ClipboardList, to: '/evaluations' },
]

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <MetricCard title="Lab Instruments" value={managerMetrics.labInstruments} icon={Boxes} tone="brand" context="Registered at this laboratory" delayMs={0} />
        <MetricCard title="Active Evaluations" value={managerMetrics.activeEvaluations} icon={FlaskConical} tone="cyan" context="Assigned or in progress" delayMs={60} />
        <MetricCard title="Pending Reviews" value={managerMetrics.pendingReviews} icon={ClipboardCheck} tone="warning" context="Awaiting reviewer action" delayMs={120} />
        <MetricCard title="Completed Tests" value={managerMetrics.completedTests} icon={ClipboardList} tone="brand" context="All-time, this laboratory" delayMs={180} />
        <MetricCard title="Passed" value={managerMetrics.passed} icon={ShieldCheck} tone="success" context="Of completed tests" delayMs={240} />
        <MetricCard title="Failed" value={managerMetrics.failed} icon={ShieldAlert} tone="danger" context="Of completed tests" delayMs={300} />
      </div>

      <QuickActionsCard actions={QUICK_ACTIONS} delayMs={0.1} />

      <PipelineBarChart
        title="Evaluation Pipeline"
        subtitle="Current workload at this laboratory"
        data={managerPipeline}
        delayMs={0.18}
      />

      <TesterWorkloadTable />

      <PendingReviewTable
        title="Review Queue"
        subtitle="Evaluations awaiting review at this laboratory"
        limit={4}
        viewAllTo="/reviews"
        delayMs={0.3}
      />

      <InstrumentStatusStrip />
    </div>
  )
}
