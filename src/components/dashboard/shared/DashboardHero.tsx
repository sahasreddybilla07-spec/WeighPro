import { ArrowUpRight, CalendarDays, ClipboardCheck, FilePlus2, FlaskConical, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'

const ROLE_ACTION = {
  admin: { label: 'View reports', to: '/reports', icon: ClipboardCheck },
  manager: { label: 'New evaluation', to: '/evaluations/new', icon: FilePlus2 },
  tester: { label: 'Open testing workspace', to: '/testing', icon: FlaskConical },
  reviewer: { label: 'Open review queue', to: '/reviews', icon: ShieldCheck },
}

export function DashboardHero() {
  const { user } = useAuth()
  if (!user) return null

  const action = ROLE_ACTION[user.role]
  const ActionIcon = action.icon
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const date = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now)

  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-[#153d40] px-6 py-7 text-white shadow-raised sm:px-8 sm:py-8">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#c7ef63]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-[38%] opacity-[0.16]" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,#a9c9c6_50%,transparent_51%),linear-gradient(transparent_49%,#a9c9c6_50%,transparent_51%)] bg-[size:30px_30px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#c7ef63] shadow-[0_0_12px_2px_rgba(199,239,99,0.55)] animate-calibrationScan" />
        <div className="absolute -right-20 -top-36 h-80 w-80 rounded-full border border-white/40" />
        <div className="absolute -right-8 -top-24 h-64 w-64 rounded-full border border-white/40" />
      </div>

      <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9e6d7]">Laboratory operations</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[30px]">{greeting}, {user.name.split(' ')[0]}</h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/70">Your workspace is ready. Review current activity and keep every instrument evaluation moving.</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/60">
            <CalendarDays className="h-4 w-4 text-[#9bcac2]" />
            {date}
            <span className="mx-1 h-1 w-1 rounded-full bg-[#c7ef63]" />
            {user.laboratoryShort}
          </p>
        </div>

        <Link to={action.to} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#c7ef63] px-4 py-2.5 text-sm font-semibold text-[#183934] shadow-sm transition-colors hover:bg-[#d8f78b] focus-visible:outline-white sm:self-auto">
          <ActionIcon className="h-4 w-4" />
          {action.label}
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
