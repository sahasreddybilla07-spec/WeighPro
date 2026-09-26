import { AlertTriangle, ArrowRight, Boxes, CalendarDays, ClipboardCheck, PackageSearch, RotateCcw, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AlertList } from '../../components/dashboard/shared/AlertList'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { PipelineBarChart } from '../../components/dashboard/shared/PipelineBarChart'
import { SectionHeading } from '../../components/dashboard/shared/SectionHeading'
import { DashboardHero } from '../../components/dashboard/shared/DashboardHero'
import { LaboratoryOverviewTable } from '../../components/dashboard/admin/LaboratoryOverviewTable'
import { UserOverviewCard } from '../../components/dashboard/admin/UserOverviewCard'
import { TesterWorkloadTable } from '../../components/dashboard/manager/TesterWorkloadTable'
import { ComplianceSummaryBar } from '../../components/dashboard/reviewer/ComplianceSummaryBar'
import { MetricCard } from '../../components/ui/MetricCard'
import { useAppData } from '../../context/AppDataContext'
import { getLabOverview, getPipeline, getSystemAlerts, getWorkload, isComplete } from '../../lib/dataSelectors'
import { todayFormatted } from '../../lib/directorMetrics'

export function AdminDashboard() {
  const { data } = useAppData()
  const pendingReviews = data.evaluations.filter((row) => row.status === 'Under Review').length
  const dueForVerification = data.instruments.filter((row) => row.status !== 'Decommissioned' && new Date(`${row.nextVerification}T00:00:00`).getTime() <= Date.now() + 30 * 86400000).length
  const needingCorrection = data.evaluations.filter((row) => row.status === 'Correction Required').length
  const completed = data.evaluations.filter(isComplete).length
  const tested = data.evaluations.filter((row) => row.result === 'PASS' || row.result === 'FAIL')
  const passCount = tested.filter((row) => row.result === 'PASS').length
  const correctionCount = data.evaluations.filter((row) => row.status === 'Correction Required').length
  const failedCount = tested.filter((row) => row.result === 'FAIL').length
  const complianceTotal = passCount + failedCount + correctionCount
  const compliance = complianceTotal ? Math.round((passCount / complianceTotal) * 100) : 0
  const reviewedDays = data.evaluations.filter((row) => row.reviewedDate).map((row) => (new Date(row.reviewedDate!).getTime() - new Date(row.createdDate).getTime()) / 86400000)
  const averageDays = reviewedDays.length ? Math.round(reviewedDays.reduce((a, b) => a + b, 0) / reviewedDays.length) : 0
  const pipeline = getPipeline(data)
  const alerts = getSystemAlerts(data)
  const labOverview = getLabOverview(data)
  const workload = getWorkload(data)
  const users = data.users.filter((row) => row.status === 'Active').length

  return (
    <div className="space-y-8">
      <DashboardHero />
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
          <MetricCard title="Evaluations" value={data.evaluations.length} icon={ClipboardCheck} tone="brand" context={`${completed} approved or completed`} delayMs={0} />
          <MetricCard title="Compliance" value={compliance} suffix="%" icon={ShieldCheck} tone="success" context="Pass rate of decided evaluations" delayMs={60} />
          <MetricCard title="Pending Approvals" value={pendingReviews} icon={RotateCcw} tone="warning" context="Awaiting reviewer action" delayMs={120} />
          <MetricCard title="Critical Alerts" value={alerts.length} icon={AlertTriangle} tone="danger" context="Require operational attention" delayMs={180} />
        </div>
      </div>

      {/* Highest priority: what needs attention right now */}
      <AlertList title="Alerts & Escalations" items={alerts} delayMs={0.1} />

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
          summary={{ pass: passCount, fail: failedCount, correctionRequired: correctionCount }}
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
        data={pipeline}
        delayMs={0.2}
      />

      {/* Lab performance */}
      <div>
        <SectionHeading eyebrow="Operations" title="Lab Performance" subtitle="Technician workload and throughput across the testing team" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <MetricCard title="Completion Rate" value={data.evaluations.length ? Math.round((completed / data.evaluations.length) * 100) : 0} suffix="%" icon={Boxes} tone="success" context="Approved or completed evaluations" delayMs={0} />
            <MetricCard title="Avg. Evaluation Time" value={averageDays} suffix=" days" icon={Users} tone="cyan" context="Days from creation to review" delayMs={60} />
          </div>
          <TesterWorkloadTable rows={workload} />
        </div>
      </div>

      {/* Secondary: broader system overview */}
      <div>
          <SectionHeading eyebrow="Overview" title="Laboratory & System Detail" muted />
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <LaboratoryOverviewTable rows={labOverview} />
            <UserOverviewCard users={users} testers={data.users.filter((row) => row.status === 'Active' && row.role === 'Testing Technician').length} reviewers={data.users.filter((row) => row.status === 'Active' && row.role === 'Legal Reviewer').length} labManagers={data.users.filter((row) => row.status === 'Active' && row.role === 'Lab Manager').length} />
          </div>
          <ActivityFeed title="Recent Activity" subtitle="Compact system-wide log" items={data.activity} maxHeightPx={260} delayMs={0.1} />
        </div>
      </div>
    </div>
  )
}
