import { cn } from '../../lib/utils'

export interface TabItem {
  key: string
  label: string
  badge?: number
}

interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (key: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-ink-200 scrollbar-thin">
      {tabs.map((tab) => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              'relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors',
              isActive ? 'text-brand-700' : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {tab.label}
            {typeof tab.badge === 'number' && (
              <span
                className={cn(
                  'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                  isActive ? 'bg-brand-700 text-white' : 'bg-ink-100 text-ink-500',
                )}
              >
                {tab.badge}
              </span>
            )}
            {isActive && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand-700" />}
          </button>
        )
      })}
    </div>
  )
}
