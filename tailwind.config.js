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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Primary ramp: Steel Blue anchored by Industrial Navy.
        // Used for primary navigation, primary buttons and important actions.
        brand: ramp('brand', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Digital Cyan ramp: accents and active-state indicators only.
        cyan: ramp('cyan', [50, 100, 200, 300, 400, 500, 600, 700]),
        // Neutral scale: text, borders, page background, hover states.
        ink: ramp('ink', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Card/popover/input backgrounds. Distinct from `ink` because dark
        // mode needs a page background darker than its elevated surfaces.
        surface: {
          DEFAULT: withOpacity('--surface-DEFAULT'),
          elevated: withOpacity('--surface-elevated'),
        },
        // Alias of brand: kept so existing "info" usages (e.g. an in-progress
        // status) read as a calmer steel blue, distinct from the cyan accent.
        info: ramp('info', [50, 100, 500, 600]),
        success: ramp('success', [50, 100, 500, 600, 700]),
        danger: ramp('danger', [50, 100, 500, 600, 700]),
        warning: ramp('warning', [50, 100, 500, 600, 700]),
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(23, 33, 38, 0.04)',
        card: '0 1px 2px 0 rgba(23, 33, 38, 0.04), 0 1px 6px -2px rgba(23, 33, 38, 0.06)',
        raised: '0 4px 14px -6px rgba(23, 33, 38, 0.12), 0 2px 6px -2px rgba(23, 33, 38, 0.06)',
        popover: '0 10px 28px -8px rgba(23, 33, 38, 0.18), 0 4px 10px -4px rgba(23, 33, 38, 0.10)',
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
          '0%, 100%': { transform: 'rotate(-24deg)' },
          '30%': { transform: 'rotate(2deg)' },
          '55%': { transform: 'rotate(16deg)' },
          '80%': { transform: 'rotate(-4deg)' },
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
        needleSettle: 'needleSettle 7s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        floatY: 'floatY 6s ease-in-out infinite',
        floatYSlow: 'floatYSlow 9s ease-in-out infinite',
        tapeExtend: 'tapeExtend 6s ease-in-out infinite',
        tickPulse: 'tickPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
