import { AlertTriangle, ArrowRight, Boxes, CalendarDays, ClipboardCheck, PackageSearch, RotateCcw, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AlertList } from '../../components/dashboard/shared/AlertList'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { PipelineBarChart } from '../../components/dashboard/shared/PipelineBarChart'
import { SectionHeading } from '../../components/dashboard/shared/SectionHeading'
import { LaboratoryOverviewTable } from '../../components/dashboard/admin/LaboratoryOverviewTable'
import { UserOverviewCard } from '../../components/dashboard/admin/UserOverviewCard'
import { TesterWorkloadTable } from '../../components/dashboard/manager/TesterWorkloadTable'
import { ComplianceSummaryBar } from '../../components/dashboard/reviewer/ComplianceSummaryBar'
import { MetricCard } from '../../components/ui/MetricCard'
import { adminPipeline, adminRecentActivity, systemAlerts } from '../../data/mockData'
import {
  averageEvaluationDays,
  completionRatePct,
  compliancePct,
  criticalAlertCount,
  evaluationsNeedingCorrection,
  instrumentsDueForVerification,
  pendingApprovals,
  pendingReviewCount,
  todayFormatted,
  totalEvaluations,
} from '../../lib/directorMetrics'

export function AdminDashboard() {
  const pendingReviews = pendingReviewCount()
  const dueForVerification = instrumentsDueForVerification()
  const needingCorrection = evaluationsNeedingCorrection()

  return (
    <div className="space-y-8">
      {/* Executive snapshot */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow="Director Overview" title="Executive Summary" subtitle="Your operational snapshot across every laboratory" />
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3 py-1.5 text-xs font-medium text-ink-500">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
            As of {todayFormatted()}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard title="Evaluations" value={totalEvaluations()} icon={ClipboardCheck} tone="brand" context="Active + completed, all labs" delayMs={0} />
          <MetricCard title="Compliance" value={Math.round(compliancePct())} suffix="%" icon={ShieldCheck} tone="success" context="Pass rate, all evaluations" delayMs={60} />
          <MetricCard title="Pending Approvals" value={pendingApprovals()} icon={RotateCcw} tone="warning" context="Awaiting reviewer action" delayMs={120} />
          <MetricCard title="Critical Alerts" value={criticalAlertCount()} icon={AlertTriangle} tone="danger" context="Need Director attention" delayMs={180} />
        </div>
      </div>

      {/* Highest priority: what needs attention right now */}
      <AlertList title="Alerts & Escalations" items={systemAlerts} delayMs={0.1} />

      {/* Pending actions + compliance, side by side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Pending Actions</h3>
              <p className="mt-0.5 text-xs text-ink-400">Work that needs Director-level sign-off</p>
            </div>
            <Link to="/evaluations" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
              Review All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="mt-4 divide-y divide-ink-100">
            <li>
              <Link to="/reviews" className="group flex items-center justify-between gap-3 py-3 first:pt-0">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
                    <RotateCcw className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink-800 group-hover:text-ink-900">Evaluations awaiting review</span>
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums text-ink-900">{pendingReviews}</span>
              </Link>
            </li>
            <li>
              <Link to="/instruments" className="group flex items-center justify-between gap-3 py-3">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info-50 text-info-600">
                    <PackageSearch className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink-800 group-hover:text-ink-900">Instruments due for verification</span>
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums text-ink-900">{dueForVerification}</span>
              </Link>
            </li>
            <li>
              <Link to="/evaluations" className="group flex items-center justify-between gap-3 py-3 last:pb-0">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger-50 text-danger-600">
                    <AlertTriangle className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink-800 group-hover:text-ink-900">Evaluations needing correction</span>
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums text-ink-900">{needingCorrection}</span>
              </Link>
            </li>
          </ul>
        </div>

        <ComplianceSummaryBar
          title="Compliance Overview"
          subtitle="Outcomes across all evaluations"
          action={
            <Link to="/reports" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
      </div>

      {/* Evaluation performance */}
      <PipelineBarChart
        title="Evaluation Performance"
        subtitle="Current evaluation volume by pipeline stage, across all laboratories"
        data={adminPipeline}
        delayMs={0.2}
      />

      {/* Lab performance */}
      <div>
        <SectionHeading eyebrow="Operations" title="Lab Performance" subtitle="Technician workload and throughput across the testing team" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <MetricCard title="Completion Rate" value={Math.round(completionRatePct())} suffix="%" icon={Boxes} tone="success" context="Completed vs. active evaluations" delayMs={0} />
            <MetricCard title="Avg. Evaluation Time" value={Math.round(averageEvaluationDays())} suffix=" days" icon={Users} tone="cyan" context="Days from creation to review" delayMs={60} />
          </div>
          <TesterWorkloadTable />
        </div>
      </div>

      {/* Secondary: broader system overview */}
      <div>
        <SectionHeading eyebrow="Overview" title="Laboratory & System Detail" muted />
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <LaboratoryOverviewTable />
            <UserOverviewCard />
          </div>
          <ActivityFeed title="Recent Activity" subtitle="Compact system-wide log" items={adminRecentActivity} maxHeightPx={260} delayMs={0.1} />
        </div>
      </div>
    </div>
  )
}
