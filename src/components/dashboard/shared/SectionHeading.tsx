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
    <div className={muted ? 'mb-3' : 'mb-5'}>
      <p className={muted ? 'text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-400' : 'text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-700'}>
        {eyebrow}
      </p>
      <h2 className={muted ? 'mt-1 text-base font-semibold text-ink-700' : 'mt-1 text-xl font-semibold tracking-tight text-ink-900'}>{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
    </div>
  )
}
