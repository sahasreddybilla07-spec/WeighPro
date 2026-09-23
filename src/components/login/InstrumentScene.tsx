import { useEffect, useState } from 'react'

const DIGIT_SEQUENCE = ['0.00 kg', '0.05 kg', '0.10 kg', '0.05 kg', '0.00 kg']

function useDigitalReadout() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % DIGIT_SEQUENCE.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return DIGIT_SEQUENCE[index]
}

// A hand-drawn, line-art instrument scene: an analog gauge settling, a digital
// readout cycling through calibration values, and a tape measure extending —
// composed around (never behind) the login form.
export function InstrumentScene() {
  const readout = useDigitalReadout()

  return (
    <div className="pointer-events-none relative h-full w-full select-none overflow-hidden" aria-hidden="true">
      {/* Faint calibration grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
        <defs>
          <pattern id="calGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#4DB8D0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#calGrid)" />
      </svg>

      {/* Floating calibration ring, upper right */}
      <svg
        className="absolute -right-6 top-10 h-24 w-24 animate-floatYSlow text-cyan-400/25"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Floating hex bolt shape, lower left */}
      <svg className="absolute -left-4 bottom-24 h-16 w-16 animate-floatY text-white/10" viewBox="0 0 100 100">
        <polygon
          points="50,4 93,27 93,73 50,96 7,73 7,27"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* Main analog dial gauge */}
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
        <svg width="220" height="170" viewBox="0 0 220 170">
          {/* Bezel */}
          <circle cx="110" cy="115" r="98" fill="#0F2733" stroke="#245A73" strokeWidth="3" />
          <circle cx="110" cy="115" r="86" fill="#12303F" stroke="#1D4A5F" strokeWidth="1" />

          {/* Ticks */}
          {Array.from({ length: 13 }).map((_, i) => {
            const angle = -210 + i * 15 // sweep from -210deg to -30deg (180deg arc, pointing up)
            const rad = (angle * Math.PI) / 180
            const isMajor = i % 3 === 0
            const rOuter = 82
            const rInner = isMajor ? 66 : 73
            const x1 = 110 + rOuter * Math.cos(rad)
            const y1 = 115 + rOuter * Math.sin(rad)
            const x2 = 110 + rInner * Math.cos(rad)
            const y2 = 115 + rInner * Math.sin(rad)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#4DB8D0' : '#245A73'}
                strokeWidth={isMajor ? 2 : 1.25}
                strokeLinecap="round"
                className={isMajor ? 'animate-tickPulse' : ''}
                style={isMajor ? { animationDelay: `${i * 0.3}s` } : undefined}
              />
            )
          })}

          {/* Needle (pivots around 110,115) */}
          <g className="origin-[110px_115px] animate-needleSettle">
            <line x1="110" y1="115" x2="110" y2="45" stroke="#16A6B6" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="110" cy="115" r="7" fill="#16A6B6" />
            <circle cx="110" cy="115" r="3" fill="#0F2733" />
          </g>

          <text x="110" y="140" textAnchor="middle" fontSize="9" fill="#79AFC0" fontFamily="IBM Plex Mono, monospace" letterSpacing="1">
            OIML R-76
          </text>
        </svg>
      </div>

      {/* Digital readout panel */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 rounded-lg border border-cyan-400/30 bg-brand-900/60 px-5 py-3 shadow-[0_0_24px_-6px_rgba(77,184,208,0.35)] backdrop-blur-sm">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">Live Reading</p>
        <p className="mt-1 animate-digitFade text-center font-mono text-2xl font-semibold tracking-wider text-cyan-300">
          {readout}
        </p>
      </div>

      {/* Tape measure, bottom edge */}
      <div className="absolute inset-x-10 bottom-14">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-cyan-400/40 bg-brand-800">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400/60" />
          </div>
          <div className="h-3 flex-1 origin-left overflow-hidden rounded-sm border border-cyan-400/30 bg-brand-900/50 animate-tapeExtend">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 400 12">
              {Array.from({ length: 40 }).map((_, i) => (
                <line
                  key={i}
                  x1={i * 10}
                  y1={i % 5 === 0 ? 0 : 5}
                  x2={i * 10}
                  y2="12"
                  stroke="#4DB8D0"
                  strokeWidth="1"
                  opacity={0.5}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
