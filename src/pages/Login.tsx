import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, User, UserRound, Users } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { DUMMY_ACCOUNTS, ROLE_LABELS } from '../auth/roles'
import { useTheme } from '../context/ThemeContext'
import { LoginHeroPanel } from '../components/login/LoginHeroPanel'
import { BrandLockup } from '../components/ui/BrandLockup'
import { cn } from '../lib/utils'

export function Login() {
  const { user, login } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const result = login(username, password)
    if (!result.success) {
      setError(result.error ?? 'Login failed.')
      setSubmitting(false)
      return
    }

    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/'
    navigate(redirectTo, { replace: true })
  }

  function fillDemo(u: string, p: string) {
    setUsername(u)
    setPassword(p)
    setError(null)
  }

  return (
    <div className="flex min-h-screen bg-ink-50">
      {/* Branding + instrument hero panel */}
      <div className="relative hidden w-[480px] shrink-0 overflow-hidden lg:block">
        <LoginHeroPanel />
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <BrandLockup size="sm" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-500">
              Digital NAWI Testing &amp; OIML Compliance Platform
            </p>
          </div>

          <div
            className="rounded-2xl border border-ink-200 bg-surface p-7 shadow-card sm:p-8"
            style={{
              boxShadow: theme === 'dark' ? '0 0 60px -18px rgba(63, 217, 232, 0.35)' : '0 0 40px -20px rgba(22, 166, 182, 0.25)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <UserRound className="h-5 w-5" strokeWidth={2} />
              </span>
              <h1 className="text-xl font-bold text-ink-900">
                Sign in to <span className="text-cyan-600">WeighPro</span>
              </h1>
            </div>
            <p className="mt-3 text-sm text-ink-500">Enter your credentials to access your dashboard.</p>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-danger-100 bg-danger-50 px-3.5 py-3 text-sm text-danger-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Username
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 transition-colors focus-within:border-cyan-500">
                  <User className="h-4 w-4 shrink-0 text-ink-400" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. tester"
                    className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Password
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-3 py-2.5 transition-colors focus-within:border-cyan-500">
                  <Lock className="h-4 w-4 shrink-0 text-ink-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="shrink-0 text-ink-400 hover:text-ink-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-cyan-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 p-4">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-ink-400" strokeWidth={2} />
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Demo accounts (prototype only)</p>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {DUMMY_ACCOUNTS.map((account) => (
                  <button
                    key={account.username}
                    type="button"
                    onClick={() => fillDemo(account.username, account.password)}
                    className={cn(
                      'flex items-center gap-2 rounded-md border border-ink-100 bg-surface px-2.5 py-2 text-left transition-colors hover:border-cyan-300 hover:bg-cyan-50',
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <UserRound className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold leading-tight text-ink-800">{ROLE_LABELS[account.role]}</span>
                      <span className="block font-mono text-[11px] text-ink-400">{account.username}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
