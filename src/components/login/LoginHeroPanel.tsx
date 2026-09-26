import { motion } from 'framer-motion'
import { BadgeCheck, Gauge, Landmark, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { BrandLockup } from '../ui/BrandLockup'

const DIGIT_SEQUENCE = ['0.0000 kg', '0.0005 kg', '0.0010 kg', '0.0005 kg', '0.0000 kg']

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

const SPEC_CHIPS = [
  { icon: BadgeCheck, label: 'OIML R76 Certified' },
  { icon: Gauge, label: 'Accuracy Class III' },
  { icon: Target, label: '±0.01% Precision' },
]

// Bespoke, theme-aware precision-instrument hero: a calibration gauge with a
// settling needle, an integrated live-reading chip and a few spec badges,
// layered over a soft technical grid + glow backdrop. Reads the theme
// directly (rather than the shared ink/brand tokens) since it's tuned to be
// a strong hero in both modes, especially dark.
export function LoginHeroPanel() {
  const { theme } = useTheme()
  const readout = useDigitalReadout()
  const dark = theme === 'dark'

  const gauge = dark
    ? {
        bezelOuter: '#0E1B33',
        bezelInner: '#152B4C',
        tickMajor: '#5FD8E8',
        tickMinor: '#2E4A72',
        needle: '#3FD9E8',
        readoutBg: 'rgba(10, 20, 40, 0.65)',
        readoutBorder: 'rgba(95, 216, 232, 0.35)',
        readoutText: '#8CEAF2',
        glow: 'rgba(63, 217, 232, 0.35)',
      }
    : {
        bezelOuter: '#0F2733',
        bezelInner: '#12303F',
        tickMajor: '#4DB8D0',
        tickMinor: '#245A73',
        needle: '#16A6B6',
        readoutBg: 'rgba(15, 39, 51, 0.6)',
        readoutBorder: 'rgba(77, 184, 208, 0.3)',
        readoutText: '#8FE0EE',
        glow: 'rgba(77, 184, 208, 0.3)',
      }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Layered background: base gradient + technical grid + soft glows */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: dark
            ? 'radial-gradient(120% 100% at 15% 0%, #123068 0%, #0B1E42 32%, #071231 62%, #050B1E 100%)'
            : 'linear-gradient(180deg, #173B4D 0%, #173B4D 55%, #0B1F28 100%)',
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="loginCalGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke={dark ? '#5FD8E8' : '#4DB8D0'} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loginCalGrid)" />
      </svg>

      {dark && (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(63,217,232,0.18) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
        </>
      )}

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
            <circle cx="120" cy="120" r="104" fill={gauge.bezelOuter} stroke={dark ? '#22375C' : '#245A73'} strokeWidth="3" />
            <circle cx="120" cy="120" r="90" fill={gauge.bezelInner} stroke={dark ? '#2E4A72' : '#1D4A5F'} strokeWidth="1" />

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
                  className={isMajor ? 'animate-tickPulse' : ''}
                  style={isMajor ? { animationDelay: `${i * 0.3}s` } : undefined}
                />
              )
            })}

            <g className="origin-[120px_120px] animate-needleSettle">
              <line x1="120" y1="120" x2="120" y2="48" stroke={gauge.needle} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="120" cy="120" r="7" fill={gauge.needle} />
              <circle cx="120" cy="120" r="3" fill={gauge.bezelOuter} />
            </g>

            <text x="120" y="146" textAnchor="middle" fontSize="9" fill={dark ? '#7C93B8' : '#79AFC0'} fontFamily="'IBM Plex Mono', monospace" letterSpacing="1.5">
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
              className="mt-1 animate-digitFade text-center font-mono text-[28px] font-bold leading-none tracking-wider tabular-nums"
              style={{ color: gauge.readoutText }}
            >
              {readout}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SPEC_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm"
                style={{
                  borderColor: dark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.18)',
                  backgroundColor: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.06)',
                  color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.9)',
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: dark ? '#5FD8E8' : '#4DB8D0' }} strokeWidth={2} />
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
