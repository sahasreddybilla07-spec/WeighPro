import { motion } from 'framer-motion'
import { BadgeCheck, Gauge, Landmark, Target } from 'lucide-react'
import { BrandLockup } from '../ui/BrandLockup'

const READOUT = '0.0000 kg'

const SPEC_CHIPS = [
  { icon: BadgeCheck, label: 'OIML R76 Certified' },
  { icon: Gauge, label: 'Accuracy Class III' },
  { icon: Target, label: '±0.01% Precision' },
]

// Theme-aware instrument illustration used beside the sign-in form.
export function LoginHeroPanel() {
  const gauge = {
    bezelOuter: '#10323b',
    bezelInner: '#143a42',
    tickMajor: '#57d8c2',
    tickMinor: '#39717a',
    needle: '#c7ef63',
    readoutBg: 'rgba(12, 43, 49, 0.78)',
    readoutBorder: 'rgba(87, 216, 194, 0.42)',
    readoutText: '#baf3e7',
    glow: 'rgba(87, 216, 194, 0.18)',
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Restrained instrument panel with a subtle technical grid. */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: 'linear-gradient(155deg, #17434a 0%, #10343d 100%)',
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="loginCalGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#8edfd0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loginCalGrid)" />
      </svg>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-12 text-white">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <BrandLockup size="lg" light />
          <p className="mt-4 max-w-[280px] text-sm font-semibold leading-snug tracking-wide text-white/90">
            Digital Weighing Instrument Testing
            <span className="mx-1.5 text-white/30">&amp;</span>
            OIML Compliance Platform
          </p>
        </motion.div>

        {/* Hero instrument graphic */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <svg width="240" height="180" viewBox="0 0 240 180" aria-hidden="true">
            <circle cx="120" cy="120" r="104" fill={gauge.bezelOuter} stroke="#28626a" strokeWidth="3" />
            <circle cx="120" cy="120" r="90" fill={gauge.bezelInner} stroke="#347078" strokeWidth="1" />

            {Array.from({ length: 13 }).map((_, i) => {
              const angle = -210 + i * 15
              const rad = (angle * Math.PI) / 180
              const isMajor = i % 3 === 0
              const rOuter = 86
              const rInner = isMajor ? 68 : 76
              const x1 = 120 + rOuter * Math.cos(rad)
              const y1 = 120 + rOuter * Math.sin(rad)
              const x2 = 120 + rInner * Math.cos(rad)
              const y2 = 120 + rInner * Math.sin(rad)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? gauge.tickMajor : gauge.tickMinor}
                  strokeWidth={isMajor ? 2 : 1.25}
                  strokeLinecap="round"
                  className={isMajor ? 'animate-calibrationTick' : ''}
                  style={isMajor ? { animationDelay: `${i * 45}ms` } : undefined}
                />
              )
            })}

            <g className="origin-[120px_120px] animate-needleSettle">
              <line x1="120" y1="120" x2="120" y2="48" stroke={gauge.needle} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="120" cy="120" r="7" fill={gauge.needle} />
              <circle cx="120" cy="120" r="3" fill={gauge.bezelOuter} />
            </g>

            <text x="120" y="146" textAnchor="middle" fontSize="9" fill="#8ad8cf" fontFamily="'IBM Plex Mono', monospace" letterSpacing="1.5">
              OIML R-76
            </text>
          </svg>

          <div
            className="-mt-2 rounded-lg border px-6 py-3 backdrop-blur-sm"
            style={{ backgroundColor: gauge.readoutBg, borderColor: gauge.readoutBorder, boxShadow: `0 0 28px -6px ${gauge.glow}` }}
          >
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: gauge.readoutText, opacity: 0.75 }}>
              Live Reading
            </p>
            <p
              className="mt-1 text-center font-mono text-[28px] font-semibold leading-none tracking-wider tabular-nums"
              style={{ color: gauge.readoutText }}
            >
              {READOUT}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SPEC_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(255,255,255,0.18)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: '#71dfcb' }} strokeWidth={2} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="relative z-10">
          <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <Landmark className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Ministry of Consumer Affairs, Food &amp; Public Distribution
          </p>
        </motion.div>
      </div>
    </div>
  )
}
