import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800',
  secondary: 'border border-ink-200 bg-white text-ink-700 hover:bg-ink-50',
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  ghost: 'text-ink-600 hover:bg-ink-100',
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_CLASSES[variant],
        className,
      )}
    />
  )
}
