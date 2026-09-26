import {
  ClipboardList,
  FileText,
  FlaskConical,
  History,
  LayoutDashboard,
  ListChecks,
  PackageSearch,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Role = 'admin' | 'manager' | 'tester' | 'reviewer'

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Director',
  manager: 'Lab Manager',
  tester: 'Testing Technician',
  reviewer: 'Legal Reviewer',
}

export interface DummyAccount {
  username: string
  password: string
  role: Role
  name: string
  initials: string
  laboratory: string
  laboratoryShort: string
}

// Frontend-only demo accounts. No backend authentication exists yet.
export const DUMMY_ACCOUNTS: DummyAccount[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Rajesh Kulkarni',
    initials: 'RK',
    laboratory: 'Legal Metrology Division, DoCA',
    laboratoryShort: 'Legal Metrology Division',
  },
  {
    username: 'manager',
    password: 'manager123',
    role: 'manager',
    name: 'Priya Desai',
    initials: 'PD',
    laboratory: 'Regional Reference Standards Laboratory, Bengaluru',
    laboratoryShort: 'RRSL, Bengaluru',
  },
  {
    username: 'tester',
    password: 'tester123',
    role: 'tester',
    name: 'Ananya Sharma',
    initials: 'AS',
    laboratory: 'Regional Reference Standards Laboratory, Bengaluru',
    laboratoryShort: 'RRSL, Bengaluru',
  },
  {
    username: 'reviewer',
    password: 'reviewer123',
    role: 'reviewer',
    name: 'Suresh Menon',
    initials: 'SM',
    laboratory: 'Regional Reference Standards Laboratory, Bengaluru',
    laboratoryShort: 'RRSL, Bengaluru',
  },
]

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

// Single source of truth for role-based navigation. RoleGuard checks derived
// from ROUTE_PERMISSIONS below stay in sync with what each role can actually see.
export const ROLE_NAV: Record<Role, NavItem[]> = {
  admin: [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'Instruments', to: '/instruments', icon: PackageSearch },
    { label: 'Evaluations', to: '/evaluations', icon: ClipboardList },
    { label: 'Reports', to: '/reports', icon: FileText },
    { label: 'Users', to: '/users', icon: Users },
    { label: 'Settings', to: '/settings', icon: Settings },
    { label: 'Audit History', to: '/audit-history', icon: History },
  ],
  manager: [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'Instruments', to: '/instruments', icon: PackageSearch },
    { label: 'Evaluations', to: '/evaluations', icon: ClipboardList },
    { label: 'Reports', to: '/reports', icon: FileText },
    { label: 'Users', to: '/users', icon: Users },
    { label: 'History', to: '/history', icon: History },
  ],
  tester: [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'My Evaluations', to: '/my-evaluations', icon: ClipboardList },
    { label: 'Instruments', to: '/instruments', icon: PackageSearch },
    { label: 'Testing Workspace', to: '/testing', icon: FlaskConical },
    { label: 'Results', to: '/results', icon: ListChecks },
    { label: 'Reports', to: '/reports', icon: FileText },
    { label: 'History', to: '/history', icon: History },
  ],
  reviewer: [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'Pending Reviews', to: '/reviews', icon: ShieldCheck },
    { label: 'Evaluations', to: '/evaluations', icon: ClipboardList },
    { label: 'Reports', to: '/reports', icon: FileText },
    { label: 'History', to: '/history', icon: History },
  ],
}

interface RoutePermission {
  test: (path: string) => boolean
  roles: Role[]
}

// Centralized permissions. The Director is the top of the role hierarchy
// (section 6) and can reach every route; every other role is limited to
// exactly what is declared here.
const ROUTE_PERMISSIONS: RoutePermission[] = [
  { test: (p) => p === '/', roles: ['admin', 'manager', 'tester', 'reviewer'] },
  { test: (p) => p === '/instruments', roles: ['admin', 'manager', 'tester'] },
  { test: (p) => p === '/instruments/new', roles: ['admin', 'manager'] },
  { test: (p) => /^\/instruments\/(?!new$)[^/]+$/.test(p), roles: ['admin', 'manager', 'tester'] },
  { test: (p) => p === '/evaluations', roles: ['admin', 'manager', 'reviewer'] },
  { test: (p) => p === '/my-evaluations', roles: ['tester'] },
  { test: (p) => p === '/evaluations/new', roles: ['admin', 'manager'] },
  { test: (p) => /^\/evaluations\/(?!new$)[^/]+$/.test(p), roles: ['admin', 'manager', 'tester', 'reviewer'] },
  { test: (p) => p === '/testing', roles: ['tester'] },
  { test: (p) => p === '/results', roles: ['tester', 'reviewer'] },
  { test: (p) => p === '/reviews', roles: ['manager', 'reviewer'] },
  { test: (p) => p === '/reports', roles: ['admin', 'manager', 'tester', 'reviewer'] },
  { test: (p) => p === '/reports/generate', roles: ['tester'] },
  { test: (p) => /^\/reports\/(?!generate$)[^/]+$/.test(p), roles: ['admin', 'manager', 'tester', 'reviewer'] },
  { test: (p) => p === '/history', roles: ['manager', 'tester', 'reviewer'] },
  { test: (p) => p === '/users', roles: ['admin', 'manager'] },
  { test: (p) => p === '/oiml-rules', roles: ['admin'] },
  { test: (p) => p === '/settings', roles: ['admin'] },
  { test: (p) => p === '/audit-history', roles: ['admin'] },
]

export function canAccess(role: Role, pathname: string): boolean {
  if (role === 'admin') return true
  const rule = ROUTE_PERMISSIONS.find((r) => r.test(pathname))
  return rule ? rule.roles.includes(role) : false
}
