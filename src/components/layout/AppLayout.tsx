import type { ReactNode } from 'react'
import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col lg:pl-[272px]">
        <Header title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
