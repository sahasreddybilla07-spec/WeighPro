import { Boxes, ClipboardCheck, ClipboardList, FilePlus2, FlaskConical, PackagePlus, ShieldAlert, ShieldCheck } from 'lucide-react'
import { PipelineBarChart } from '../../components/dashboard/shared/PipelineBarChart'
import { PendingReviewTable } from '../../components/dashboard/shared/PendingReviewTable'
import { QuickActionsCard } from '../../components/dashboard/shared/QuickActionsCard'
import type { QuickAction } from '../../components/dashboard/shared/QuickActionsCard'
import { SectionHeading } from '../../components/dashboard/shared/SectionHeading'
import { DashboardHero } from '../../components/dashboard/shared/DashboardHero'
import { TesterWorkloadTable } from '../../components/dashboard/manager/TesterWorkloadTable'
import { InstrumentStatusStrip } from '../../components/dashboard/manager/InstrumentStatusStrip'
import { MetricCard } from '../../components/ui/MetricCard'
import { useAppData } from '../../context/AppDataContext'
import { useAuth } from '../../auth/AuthContext'
import { getPipeline, isComplete } from '../../lib/dataSelectors'

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Register Instrument', description: 'Add a new NAWI to the registry', icon: PackagePlus, to: '/instruments/new' },
  { label: 'Create Evaluation', description: 'Start a new compliance evaluation', icon: FilePlus2, to: '/evaluations/new' },
  { label: 'Assign Evaluation', description: 'Assign an evaluation to a tester', icon: ClipboardList, to: '/evaluations' },
]

export function ManagerDashboard() {
  const { data } = useAppData()
  const { user } = useAuth()
  const laboratory = user?.laboratory
  const instruments = data.instruments.filter((row) => !laboratory || row.lab === laboratory)
  const evaluations = data.evaluations.filter((row) => !laboratory || row.lab === laboratory)
  const metrics = {
    labInstruments: instruments.length,
    activeEvaluations: evaluations.filter((row) => !isComplete(row)).length,
    pendingReviews: evaluations.filter((row) => row.status === 'Under Review').length,
    completedTests: evaluations.filter(isComplete).length,
    passed: evaluations.filter((row) => isComplete(row) && row.result === 'PASS').length,
    failed: evaluations.filter((row) => isComplete(row) && row.result === 'FAIL').length,
  }
  const pipeline = getPipeline(data, laboratory)
  return (
    <div className="space-y-8">
      <DashboardHero />
      {/* Primary work: register instruments and assign testing */}
      <div>
        <SectionHeading eyebrow="Your Work" title="Today's Operations" subtitle="Assignments, workload and approvals for this laboratory" />
        <div className="space-y-6">
          <QuickActionsCard actions={QUICK_ACTIONS} delayMs={0.1} />
          <TesterWorkloadTable />
          <PendingReviewTable
            title="Submitted Evaluations"
            subtitle="Evaluations currently in the reviewer queue at this laboratory"
            limit={4}
            viewAllTo="/evaluations"
            delayMs={0.3}
          />
        </div>
      </div>

      {/* Secondary: at-a-glance metrics */}
      <div>
        <SectionHeading eyebrow="Overview" title="At a Glance" muted />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <MetricCard title="Lab Instruments" value={metrics.labInstruments} icon={Boxes} tone="brand" context="Registered at this laboratory" delayMs={0} />
          <MetricCard title="Active Evaluations" value={metrics.activeEvaluations} icon={FlaskConical} tone="cyan" context="Not yet approved or completed" delayMs={60} />
          <MetricCard title="Pending Reviews" value={metrics.pendingReviews} icon={ClipboardCheck} tone="warning" context="Awaiting reviewer action" delayMs={120} />
          <MetricCard title="Completed Tests" value={metrics.completedTests} icon={ClipboardList} tone="brand" context="Approved or completed" delayMs={180} />
          <MetricCard title="Passed" value={metrics.passed} icon={ShieldCheck} tone="success" context="Of completed evaluations" delayMs={240} />
          <MetricCard title="Failed" value={metrics.failed} icon={ShieldAlert} tone="danger" context="Of completed evaluations" delayMs={300} />
        </div>
      </div>

      {/* Analytics: supporting context, not the main event */}
      <div className="space-y-6">
        <PipelineBarChart
          title="Evaluation Pipeline"
          subtitle="Current workload at this laboratory"
          data={pipeline}
          delayMs={0.18}
        />
        <InstrumentStatusStrip />
      </div>
    </div>
  )
}
