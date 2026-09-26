import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AccessRestricted() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-danger-100 bg-surface p-10 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-50 text-danger-600">
        <ShieldAlert className="h-6 w-6" strokeWidth={2} />
      </span>
      <h2 className="mt-5 text-lg font-bold text-ink-900">Access Restricted</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        You do not have permission to access this page. This area is restricted to specific WEIGHPRO roles.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
      >
        Return to Dashboard
      </Link>
    </motion.div>
  )
}
