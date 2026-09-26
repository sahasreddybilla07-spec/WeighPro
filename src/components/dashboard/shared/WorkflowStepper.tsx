import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

interface WorkflowStepperProps {
  title: string
  subtitle?: string
  steps: string[]
  currentIndex: number
  delayMs?: number
}

export function WorkflowStepper({ title, subtitle, steps, currentIndex, delayMs = 0 }: WorkflowStepperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-ink-200 bg-surface p-5 shadow-card"
    >
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>}

      <div className="mt-6 flex flex-wrap items-start gap-y-6 sm:flex-nowrap">
        {steps.map((step, index) => {
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex
          const isLast = index === steps.length - 1

          return (
            <div key={step} className={cn('flex items-center', !isLast && 'flex-1')}>
              <div className="flex min-w-[84px] flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
                    isDone && 'border-success-500 bg-success-500 text-white',
                    isCurrent && 'animate-currentStep border-cyan-500 bg-cyan-50 text-cyan-700',
                    !isDone && !isCurrent && 'border-ink-200 bg-surface text-ink-400',
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium leading-tight',
                    isCurrent ? 'text-ink-900' : isDone ? 'text-ink-600' : 'text-ink-400',
                  )}
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <span
                  className={cn('mx-1 hidden h-0.5 flex-1 rounded-full sm:block', isDone ? 'bg-success-500' : 'bg-ink-200')}
                />
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
