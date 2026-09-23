import { Clock, FileText, ListChecks, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'
import { PendingReviewTable } from '../../components/dashboard/shared/PendingReviewTable'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { QuickActionsCard } from '../../components/dashboard/shared/QuickActionsCard'
import type { QuickAction } from '../../components/dashboard/shared/QuickActionsCard'
import { ComplianceSummaryBar } from '../../components/dashboard/reviewer/ComplianceSummaryBar'
import { MetricCard } from '../../components/ui/MetricCard'
import { recentDecisions, reviewWorkflowCurrentIndex, reviewWorkflowSteps, reviewerMetrics } from '../../data/mockData'

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Review Evaluation', description: 'Open the next evaluation awaiting review', icon: ShieldCheck, to: '/reviews' },
  { label: 'View Failed Tests', description: 'See evaluations that did not pass', icon: ListChecks, to: '/results' },
  { label: 'View Reports', description: 'Browse the standardized report repository', icon: FileText, to: '/reports' },
]

export function ReviewerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <MetricCard title="Pending Reviews" value={reviewerMetrics.pendingReviews} icon={ShieldCheck} tone="brand" context="Awaiting your decision" delayMs={0} />
        <MetricCard title="Due Today" value={reviewerMetrics.dueToday} icon={Clock} tone="warning" context="Reviews due today" delayMs={60} />
        <MetricCard title="Returned" value={reviewerMetrics.returned} icon={RotateCcw} tone="cyan" context="Sent back for correction" delayMs={120} />
        <MetricCard title="Approved" value={reviewerMetrics.approved} icon={ShieldCheck} tone="success" context="All-time approvals" delayMs={180} />
        <MetricCard title="Failed" value={reviewerMetrics.failed} icon={ShieldAlert} tone="danger" context="All-time failures" delayMs={240} />
      </div>

      <PendingReviewTable title="Pending Review Queue" subtitle="Evaluations awaiting your review" delayMs={0.16} />

      <WorkflowStepper
        title="Review Status"
        subtitle="EV-2026-0142 · Electronic Platform Scale ABC-100"
        steps={reviewWorkflowSteps}
        currentIndex={reviewWorkflowCurrentIndex}
        delayMs={0.24}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComplianceSummaryBar />
        <ActivityFeed title="Recent Decisions" subtitle="Your latest review outcomes" items={recentDecisions} maxHeightPx={220} delayMs={0.34} />
      </div>

      <QuickActionsCard actions={QUICK_ACTIONS} delayMs={0.42} />
    </div>
  )
}
