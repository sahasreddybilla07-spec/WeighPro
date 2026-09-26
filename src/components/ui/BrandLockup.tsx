import logoMark from '../../assets/final-logo.jpg'
import { cn } from '../../lib/utils'

interface BrandLockupProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  markClassName?: string
  light?: boolean
}

const SIZE_MAP = {
  sm: { mark: 'h-7 w-7', text: 'text-lg' },
  md: { mark: 'h-9 w-9', text: 'text-xl' },
  lg: { mark: 'h-14 w-14', text: 'text-3xl' },
}

export function BrandLockup({ size = 'md', className, markClassName, light = false }: BrandLockupProps) {
  const dims = SIZE_MAP[size]
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img src={logoMark} alt="" className={cn(dims.mark, 'w-auto shrink-0 object-contain', markClassName)} />
      <span className={cn('font-bold tracking-tight', dims.text, light ? 'text-white' : 'text-brand-700')}>
        Weigh<span className={light ? 'text-cyan-300' : 'text-cyan-600'}>Metric</span>
      </span>
    </div>
  )
}
