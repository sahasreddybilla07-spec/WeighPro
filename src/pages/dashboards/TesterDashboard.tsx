import { CheckCircle2, ClipboardList, FlaskConical, ListChecks, Send } from 'lucide-react'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'
import { QuickActionsCard } from '../../components/dashboard/shared/QuickActionsCard'
import type { QuickAction } from '../../components/dashboard/shared/QuickActionsCard'
import { MyEvaluationsTable } from '../../components/dashboard/tester/MyEvaluationsTable'
import { TesterNotificationsCard } from '../../components/dashboard/tester/TesterNotificationsCard'
import { MetricCard } from '../../components/ui/MetricCard'
import { testerMetrics, testingWorkflowCurrentIndex, testingWorkflowSteps } from '../../data/mockData'

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Start Evaluation', description: 'Begin testing an assigned evaluation', icon: FlaskConical, to: '/testing' },
  { label: 'Continue Testing', description: 'Resume your active testing workspace', icon: ClipboardList, to: '/testing' },
  { label: 'View Results', description: 'Review your calculated test results', icon: ListChecks, to: '/results' },
]

export function TesterDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard title="Assigned Evaluations" value={testerMetrics.assigned} icon={ClipboardList} tone="brand" context="Awaiting you to start" delayMs={0} />
        <MetricCard title="In Progress" value={testerMetrics.inProgress} icon={FlaskConical} tone="cyan" context="Currently being tested" delayMs={60} />
        <MetricCard title="Pending Submission" value={testerMetrics.pendingSubmission} icon={Send} tone="warning" context="Tests done, not yet submitted" delayMs={120} />
        <MetricCard title="Completed" value={testerMetrics.completed} icon={CheckCircle2} tone="success" context="All-time submissions" delayMs={180} />
      </div>

      <MyEvaluationsTable />

      <WorkflowStepper
        title="Current Testing Progress"
        subtitle="EV-2026-0138 · Precision Balance Combics CIS1"
        steps={testingWorkflowSteps}
        currentIndex={testingWorkflowCurrentIndex}
        delayMs={0.24}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuickActionsCard actions={QUICK_ACTIONS} delayMs={0.3} />
        <TesterNotificationsCard />
      </div>
    </div>
  )
}
