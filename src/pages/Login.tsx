import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, User, UserRound, Users } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { DUMMY_ACCOUNTS, ROLE_LABELS } from '../auth/roles'
import { useTheme } from '../context/ThemeContext'
import { LoginHeroPanel } from '../components/login/LoginHeroPanel'
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
    <div className="login-shell relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      {/* Branding + instrument hero panel */}
      <div className="relative z-10 w-full shrink-0 lg:flex lg:w-[48%] lg:items-stretch xl:w-1/2">
        <LoginHeroPanel />
      </div>

      {/* Form panel */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-5 pb-10 pt-2 sm:px-8 lg:min-h-screen lg:px-10 lg:py-12 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[550px]"
        >
          <div
            className="login-card rounded-[24px] border p-6 sm:p-8"
            style={{ boxShadow: theme === 'dark' ? '0 12px 32px -20px rgba(0, 0, 0, 0.7)' : undefined }}
          >
            <div className="flex items-center gap-3">
              <span className="login-icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                <UserRound className="h-5 w-5" strokeWidth={2} />
              </span>
              <h1 className="text-xl font-bold text-white">
                Sign in to <span className="text-teal-200">WeighMetric</span>
              </h1>
            </div>
            <p className="mt-3 text-sm text-white/60">Enter your credentials to access your dashboard.</p>

            {error && (
              <div className="login-error mt-5 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="username" className="login-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]">
                  Username
                </label>
                <div className="login-field flex h-[50px] items-center gap-3 rounded-xl border px-3.5 transition-all">
                  <User className="h-4 w-4 shrink-0" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. tester"
                    className="login-field-input w-full text-sm text-white placeholder:text-white/35 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="login-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]">
                  Password
                </label>
                <div className="login-field flex h-[50px] items-center gap-3 rounded-xl border px-3.5 transition-all">
                  <Lock className="h-4 w-4 shrink-0" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="login-field-input w-full text-sm text-white placeholder:text-white/35 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="login-password-toggle shrink-0 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="login-submit mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="login-demo mt-6 rounded-2xl border p-4">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-teal-200/70" strokeWidth={2} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">Demo accounts (prototype only)</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {DUMMY_ACCOUNTS.map((account) => (
                  <button
                    key={account.username}
                    type="button"
                    onClick={() => fillDemo(account.username, account.password)}
                    className={cn(
                      'login-demo-account flex min-h-[58px] items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-all',
                    )}
                  >
                    <span className="login-demo-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                      <UserRound className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold leading-tight text-white/90">{ROLE_LABELS[account.role]}</span>
                      <span className="block font-mono text-[11px] text-white/45">{account.username}</span>
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
