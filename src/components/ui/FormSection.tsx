import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('rounded-2xl border border-ink-200 bg-surface p-6 shadow-card', className)}>
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-0.5 text-xs text-ink-500">{description}</p>}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

interface FieldProps {
  label: string
  children: ReactNode
  full?: boolean
  hint?: string
}

export function Field({ label, children, full, hint }: FieldProps) {
  return (
    <div className={cn(full && 'sm:col-span-2')}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border border-ink-200 bg-surface px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-cyan-500 focus:outline-none',
        props.className,
      )}
    />
  )
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-lg border border-ink-200 bg-surface px-3 py-2.5 text-sm text-ink-900 transition-colors focus:border-cyan-500 focus:outline-none',
        props.className,
      )}
    />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-lg border border-ink-200 bg-surface px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-cyan-500 focus:outline-none',
        props.className,
      )}
    />
  )
}
