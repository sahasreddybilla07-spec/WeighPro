import { Sigma } from 'lucide-react'

interface CalculationExplainerProps {
  formula: string
  passCondition: string
  example?: string
}

// Makes the arithmetic behind a test's PASS/FAIL result visible instead of
// only showing the final badge — the formula and condition describe the
// real relationship already implicit in each row's own fields (indicated
// value, test load, MPE), not an invented OIML-specific rule.
export function CalculationExplainer({ formula, passCondition, example }: CalculationExplainerProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
        <Sigma className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">How this result is calculated</p>
        <p className="font-mono text-sm font-medium text-ink-800">{formula}</p>
        <p className="font-mono text-sm text-ink-600">{passCondition}</p>
        {example && <p className="mt-1 text-xs text-ink-500">Example: {example}</p>}
      </div>
    </div>
  )
}
