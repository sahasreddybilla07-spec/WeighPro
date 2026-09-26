/** @type {import('tailwindcss').Config} */

// Reads each color from a CSS custom property (defined per-theme in
// src/index.css) so every existing `bg-ink-*` / `text-brand-*` / etc. class
// automatically re-themes when `data-theme` flips — no dark: variants needed.
function withOpacity(varName) {
  return ({ opacityValue }) =>
    opacityValue === undefined ? `rgb(var(${varName}))` : `rgb(var(${varName}) / ${opacityValue})`
}

function ramp(name, steps) {
  return Object.fromEntries(steps.map((step) => [step, withOpacity(`--${name}-${step}`)]))
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Primary ramp: vivid metrology teal for primary actions and navigation.
        brand: ramp('brand', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Seafoam ramp for active states and secondary highlights.
        cyan: ramp('cyan', [50, 100, 200, 300, 400, 500, 600, 700]),
        // Neutral scale: text, borders, page background, hover states.
        ink: ramp('ink', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Card/popover/input backgrounds. Distinct from `ink` because dark
        // mode needs a page background darker than its elevated surfaces.
        surface: {
          DEFAULT: withOpacity('--surface-DEFAULT'),
          elevated: withOpacity('--surface-elevated'),
        },
        // Alias of the teal family for informational states and chart accents.
        info: ramp('info', [50, 100, 500, 600]),
        success: ramp('success', [50, 100, 500, 600, 700]),
        danger: ramp('danger', [50, 100, 500, 600, 700]),
        warning: ramp('warning', [50, 100, 500, 600, 700]),
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(24, 34, 47, 0.05)',
        card: '0 1px 2px 0 rgba(24, 34, 47, 0.04), 0 3px 10px -5px rgba(24, 34, 47, 0.10)',
        raised: '0 8px 22px -10px rgba(24, 34, 47, 0.22), 0 2px 8px -4px rgba(24, 34, 47, 0.10)',
        popover: '0 16px 38px -12px rgba(12, 20, 31, 0.28), 0 4px 12px -6px rgba(12, 20, 31, 0.12)',
        'inset-line': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.7)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 74, 69, 0.45)' },
          '50%': { boxShadow: '0 0 0 4px rgba(201, 74, 69, 0)' },
        },
        needleSettle: {
          '0%': { transform: 'rotate(-22deg)' },
          '62%': { transform: 'rotate(3deg)' },
          '78%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        calibrationTick: {
          '0%': { opacity: '0.28' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        calibrationScan: {
          '0%': { top: '0%', opacity: '0' },
          '12%': { opacity: '0.6' },
          '88%': { opacity: '0.35' },
          '100%': { top: '100%', opacity: '0' },
        },
        currentStep: {
          '0%': { boxShadow: '0 0 0 0 rgba(47, 188, 159, 0.0)', transform: 'scale(0.94)' },
          '55%': { boxShadow: '0 0 0 5px rgba(47, 188, 159, 0.18)', transform: 'scale(1.04)' },
          '100%': { boxShadow: '0 0 0 0 rgba(47, 188, 159, 0.0)', transform: 'scale(1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatYSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        tapeExtend: {
          '0%, 100%': { transform: 'scaleX(0.32)' },
          '50%': { transform: 'scaleX(1)' },
        },
        tickPulse: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.85' },
        },
        digitFade: {
          '0%, 100%': { opacity: '1' },
          '45%, 55%': { opacity: '0.4' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        fadeIn: 'fadeIn 0.4s ease-out both',
        pulseDot: 'pulseDot 2s ease-out infinite',
        needleSettle: 'needleSettle 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        calibrationTick: 'calibrationTick 700ms ease-out both',
        riseIn: 'riseIn 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        calibrationScan: 'calibrationScan 9s ease-in-out infinite',
        currentStep: 'currentStep 800ms ease-out both',
        floatY: 'floatY 6s ease-in-out infinite',
        floatYSlow: 'floatYSlow 9s ease-in-out infinite',
        tapeExtend: 'tapeExtend 6s ease-in-out infinite',
        tickPulse: 'tickPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
