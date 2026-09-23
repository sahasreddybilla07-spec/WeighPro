import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { canAccess } from '../../auth/roles'
import { AccessRestricted } from '../../pages/AccessRestricted'

export function RoleGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return null // ProtectedRoute (rendered above this) handles the redirect

  if (!canAccess(user.role, location.pathname)) {
    return <AccessRestricted />
  }

  return <>{children}</>
}
