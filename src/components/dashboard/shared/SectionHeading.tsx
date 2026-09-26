interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  muted?: boolean
}

// A small, consistent heading used to mark the "primary work" block at the
// top of each role dashboard, and again (in its muted form) above the
// de-emphasized metrics/analytics sections further down.
export function SectionHeading({ eyebrow, title, subtitle, muted }: SectionHeadingProps) {
  return (
    <div className={muted ? 'mb-3' : 'mb-4'}>
      <p className={muted ? 'text-[11px] font-semibold uppercase tracking-wider text-ink-400' : 'text-xs font-semibold uppercase tracking-wider text-cyan-600'}>
        {eyebrow}
      </p>
      <h2 className={muted ? 'mt-0.5 text-sm font-semibold text-ink-600' : 'mt-0.5 text-lg font-bold text-ink-900'}>{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
    </div>
  )
}
