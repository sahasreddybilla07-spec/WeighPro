import { Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { RoleGuard } from './components/auth/RoleGuard'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { InstrumentsList } from './pages/instruments/InstrumentsList'
import { NewInstrument } from './pages/instruments/NewInstrument'
import { InstrumentDetails } from './pages/instruments/InstrumentDetails'
import { InstrumentHistory } from './pages/instruments/InstrumentHistory'
import { EvaluationsList } from './pages/evaluations/EvaluationsList'
import { MyEvaluations } from './pages/evaluations/MyEvaluations'
import { NewEvaluation } from './pages/evaluations/NewEvaluation'
import { EvaluationDetail } from './pages/evaluations/EvaluationDetail'
import { TestingWorkspace } from './pages/testing/TestingWorkspace'
import { TestResults } from './pages/TestResults'
import { PendingReviews } from './pages/PendingReviews'
import { ReportsRepository } from './pages/ReportsRepository'
import { ReportPreview } from './pages/ReportPreview'
import { Users } from './pages/Users'
import { OimlRules } from './pages/OimlRules'
import { Settings } from './pages/Settings'
import { AuditHistory } from './pages/AuditHistory'
import type { Role } from './auth/roles'

const PLACEHOLDER_ROUTES: { path: string; title: string; element: JSX.Element }[] = [
  { path: '/instruments', title: 'Instruments', element: <InstrumentsList /> },
  { path: '/instruments/new', title: 'Register Instrument', element: <NewInstrument /> },
  { path: '/instruments/:id', title: 'Instrument Details', element: <InstrumentDetails /> },
  { path: '/evaluations', title: 'Evaluations', element: <EvaluationsList /> },
  { path: '/my-evaluations', title: 'My Evaluations', element: <MyEvaluations /> },
  { path: '/evaluations/new', title: 'New Evaluation', element: <NewEvaluation /> },
  { path: '/evaluations/:id', title: 'Evaluation Details', element: <EvaluationDetail /> },
  { path: '/testing', title: 'Testing Workspace', element: <TestingWorkspace /> },
  { path: '/results', title: 'Test Results', element: <TestResults /> },
  { path: '/reviews', title: 'Pending Reviews', element: <PendingReviews /> },
  { path: '/reports', title: 'Reports Repository', element: <ReportsRepository /> },
  { path: '/reports/generate', title: 'Report Preview', element: <ReportPreview /> },
  { path: '/reports/:id', title: 'Report Preview', element: <ReportPreview /> },
  { path: '/history', title: 'Instrument History', element: <InstrumentHistory /> },
  { path: '/users', title: 'Users', element: <Users /> },
  { path: '/oiml-rules', title: 'OIML R-76 Rules', element: <OimlRules /> },
  { path: '/settings', title: 'Settings', element: <Settings /> },
  { path: '/audit-history', title: 'Audit History', element: <AuditHistory /> },
]

const DASHBOARD_META: Record<Role, { title: string; subtitle: string }> = {
  admin: { title: 'System Admin Dashboard', subtitle: 'System-wide monitoring across laboratories, users and instruments.' },
  manager: { title: 'Lab Manager Dashboard', subtitle: 'Manage laboratory operations and testing team workload.' },
  tester: { title: 'Tester Dashboard', subtitle: 'Track your assigned evaluations and testing progress.' },
  reviewer: { title: 'Reviewer Dashboard', subtitle: 'Review submitted evaluations and manage compliance decisions.' },
}

function DashboardRoute() {
  const { user } = useAuth()
  const meta = user ? DASHBOARD_META[user.role] : { title: 'Dashboard', subtitle: undefined }
  return (
    <AppLayout title={meta.title} subtitle={meta.subtitle}>
      <Dashboard />
    </AppLayout>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleGuard>
              <DashboardRoute />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      {PLACEHOLDER_ROUTES.map(({ path, title, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <AppLayout title={title}>
                <RoleGuard>{element}</RoleGuard>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
