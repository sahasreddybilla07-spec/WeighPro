import { Clock, FileText, ListChecks, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react'
import { WorkflowStepper } from '../../components/dashboard/shared/WorkflowStepper'
import { PendingReviewTable } from '../../components/dashboard/shared/PendingReviewTable'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { QuickActionsCard } from '../../components/dashboard/shared/QuickActionsCard'
import type { QuickAction } from '../../components/dashboard/shared/QuickActionsCard'
import { SectionHeading } from '../../components/dashboard/shared/SectionHeading'
import { DashboardHero } from '../../components/dashboard/shared/DashboardHero'
import { ComplianceSummaryBar } from '../../components/dashboard/reviewer/ComplianceSummaryBar'
import { MetricCard } from '../../components/ui/MetricCard'
import { reviewWorkflowSteps } from '../../data/mockData'
import { useAppData } from '../../context/AppDataContext'
import { localDateString } from '../../lib/utils'
import { useAuth } from '../../auth/AuthContext'

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Review Evaluation', description: 'Open the next evaluation awaiting review', icon: ShieldCheck, to: '/reviews' },
  { label: 'View Failed Tests', description: 'See evaluations that did not pass', icon: ListChecks, to: '/results' },
  { label: 'View Reports', description: 'Browse the standardized report repository', icon: FileText, to: '/reports' },
]

export function ReviewerDashboard() {
  const { data } = useAppData()
  const { user } = useAuth()
  const reviews = data.evaluations.filter((row) => row.status === 'Under Review' && row.reviewer === user?.name)
  const corrections = data.evaluations.filter((row) => row.status === 'Correction Required' && row.reviewer === user?.name)
  const reviewed = data.evaluations.filter((row) => row.reviewer === user?.name && (row.status === 'Approved' || row.status === 'Completed' || row.status === 'Correction Required'))
  const reviewerMetrics = {
    pendingReviews: reviews.length,
    dueToday: reviews.filter((row) => row.submittedDate === localDateString()).length,
    returned: corrections.length,
    approved: reviewed.filter((row) => row.result === 'PASS' && row.status !== 'Correction Required').length,
    failed: reviewed.filter((row) => row.result === 'FAIL').length,
  }
  const decisions = data.activity.filter((row) => row.type === 'approved' || row.type === 'correction' || row.type === 'report')
  const selectedReview = reviews[0]
  return (
    <div className="space-y-8">
      <DashboardHero />
      {/* Primary work: reviews awaiting your decision */}
      <div>
        <SectionHeading eyebrow="Your Work" title="Awaiting Your Review" subtitle="Evaluations submitted by testers, pending your decision" />
        <div className="space-y-6">
          <PendingReviewTable title="Pending Review Queue" subtitle="Evaluations awaiting your review" delayMs={0.16} />
          <WorkflowStepper
            title="Review Status"
            subtitle={selectedReview ? `${selectedReview.id} · ${selectedReview.instrumentType} ${selectedReview.model}` : 'No evaluation is currently under review'}
            steps={reviewWorkflowSteps}
            currentIndex={selectedReview ? 1 : 0}
            delayMs={0.24}
          />
        </div>
      </div>

      {/* Secondary: at-a-glance metrics */}
      <div>
        <SectionHeading eyebrow="Overview" title="At a Glance" muted />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <MetricCard title="Pending Reviews" value={reviewerMetrics.pendingReviews} icon={ShieldCheck} tone="brand" context="Awaiting your decision" delayMs={0} />
          <MetricCard title="Due Today" value={reviewerMetrics.dueToday} icon={Clock} tone="warning" context="Reviews due today" delayMs={60} />
          <MetricCard title="Returned" value={reviewerMetrics.returned} icon={RotateCcw} tone="cyan" context="Sent back for correction" delayMs={120} />
          <MetricCard title="Approved" value={reviewerMetrics.approved} icon={ShieldCheck} tone="success" context="All-time approvals" delayMs={180} />
          <MetricCard title="Failed" value={reviewerMetrics.failed} icon={ShieldAlert} tone="danger" context="All-time failures" delayMs={240} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComplianceSummaryBar summary={{ pass: reviewerMetrics.approved, fail: reviewerMetrics.failed, correctionRequired: reviewerMetrics.returned }} />
        <ActivityFeed title="Recent Decisions" subtitle="Your latest review outcomes" items={decisions} maxHeightPx={220} delayMs={0.34} />
      </div>

      <QuickActionsCard actions={QUICK_ACTIONS} delayMs={0.42} />
    </div>
  )
}
