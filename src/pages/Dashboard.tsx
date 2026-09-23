import { useAuth } from '../auth/AuthContext'
import { AdminDashboard } from './dashboards/AdminDashboard'
import { ManagerDashboard } from './dashboards/ManagerDashboard'
import { ReviewerDashboard } from './dashboards/ReviewerDashboard'
import { TesterDashboard } from './dashboards/TesterDashboard'

// Renders the correct role-specific dashboard for the logged-in user.
export function Dashboard() {
  const { user } = useAuth()
  if (!user) return null

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />
    case 'manager':
      return <ManagerDashboard />
    case 'tester':
      return <TesterDashboard />
    case 'reviewer':
      return <ReviewerDashboard />
    default:
      return null
  }
}
