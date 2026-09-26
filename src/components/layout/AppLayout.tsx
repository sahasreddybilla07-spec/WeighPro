import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col bg-ink-50 lg:pl-[264px]">
        <Header title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex-1 px-4 py-6 sm:px-6 lg:px-9 lg:py-8"
        >
          <div className="mx-auto w-full max-w-[1480px]">{children}</div>
        </motion.main>
      </div>
    </div>
  )
}
