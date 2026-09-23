/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Primary ramp: Steel Blue (500) anchored by Industrial Navy (700).
        // Used for primary navigation, primary buttons and important actions.
        brand: {
          50: '#EAF2F4',
          100: '#D2E4E9',
          200: '#A8CCD6',
          300: '#79AFC0',
          400: '#4A8CA3',
          500: '#245A73',
          600: '#1D4A5F',
          700: '#173B4D',
          800: '#112C38',
          900: '#0B1F28',
        },
        // Digital Cyan ramp: accents and active-state indicators only.
        cyan: {
          50: '#E7FAFB',
          100: '#C7F1F4',
          200: '#96E3E9',
          300: '#63CFDA',
          400: '#4DB8D0',
          500: '#16A6B6',
          600: '#128B99',
          700: '#0E6E79',
        },
        // Neutral scale built from the given text/border/background values.
        ink: {
          50: '#F1F4F5',
          100: '#E7ECED',
          200: '#D7E0E3',
          300: '#C2CDD1',
          400: '#9AA9AE',
          500: '#69777D',
          600: '#526166',
          700: '#3D4A4F',
          800: '#263135',
          900: '#172126',
        },
        // Alias of brand: kept so existing "info" usages (e.g. an in-progress
        // status) read as a calmer steel blue, distinct from the cyan accent.
        info: {
          50: '#EAF2F4',
          100: '#D2E4E9',
          500: '#245A73',
          600: '#1D4A5F',
        },
        success: {
          50: '#EAF7F1',
          100: '#CDEEE0',
          500: '#23845A',
          600: '#1D6D4A',
          700: '#175A3D',
        },
        danger: {
          50: '#FBEEED',
          100: '#F5D6D4',
          500: '#C94A45',
          600: '#B03934',
          700: '#8E2E2A',
        },
        warning: {
          50: '#FBF3E7',
          100: '#F3E0BF',
          500: '#C58B2A',
          600: '#A8741F',
          700: '#875C19',
        },
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
