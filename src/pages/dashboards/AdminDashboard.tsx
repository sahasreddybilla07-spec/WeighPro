import { Boxes, Building2, CheckCircle2, ClipboardCheck, FlaskConical, Users } from 'lucide-react'
import { AlertList } from '../../components/dashboard/shared/AlertList'
import { ActivityFeed } from '../../components/dashboard/shared/ActivityFeed'
import { PipelineBarChart } from '../../components/dashboard/shared/PipelineBarChart'
import { LaboratoryOverviewTable } from '../../components/dashboard/admin/LaboratoryOverviewTable'
import { UserOverviewCard } from '../../components/dashboard/admin/UserOverviewCard'
import { MetricCard } from '../../components/ui/MetricCard'
import { adminMetrics, adminPipeline, adminRecentActivity, systemAlerts } from '../../data/mockData'

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <MetricCard title="Total Labs" value={adminMetrics.totalLabs} icon={Building2} tone="brand" context="Registered laboratories" delayMs={0} />
        <MetricCard title="Total Users" value={adminMetrics.totalUsers} icon={Users} tone="cyan" context="Across all roles" delayMs={60} />
        <MetricCard title="Total Instruments" value={adminMetrics.totalInstruments} icon={Boxes} tone="brand" context="Registered NAWIs" delayMs={120} />
        <MetricCard title="Active Evaluations" value={adminMetrics.activeEvaluations} icon={FlaskConical} tone="cyan" context="Currently in progress" delayMs={180} />
        <MetricCard title="Pending Reviews" value={adminMetrics.pendingReviews} icon={ClipboardCheck} tone="warning" context="Awaiting reviewer action" delayMs={240} />
        <MetricCard title="Completed Evaluations" value={adminMetrics.completedEvaluations} icon={CheckCircle2} tone="success" context="All-time, all laboratories" delayMs={300} />
      </div>

      <PipelineBarChart
        title="System Evaluation Overview"
        subtitle="Evaluation status distribution across all laboratories, this month"
        data={adminPipeline}
        delayMs={0.15}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <LaboratoryOverviewTable />
        <UserOverviewCard />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AlertList title="System Alerts" items={systemAlerts} delayMs={0.34} />
        <ActivityFeed title="Recent Activity" subtitle="Compact system-wide log" items={adminRecentActivity} maxHeightPx={260} delayMs={0.4} />
      </div>
    </div>
  )
}
