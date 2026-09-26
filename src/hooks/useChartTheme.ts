import { useTheme } from '../context/ThemeContext'

// Recharts renders to SVG and can't read Tailwind classes, so chart color
// values are mirrored here from the CSS custom properties in src/index.css.
const CHART_COLORS = {
  light: {
    axisText: '#3D4A4F',
    grid: '#E7ECED',
    tooltipBg: '#FFFFFF',
    tooltipBorder: '#D7E0E3',
    tooltipText: '#172126',
    tooltipMuted: '#69777D',
    labelText: '#172126',
    cursorFill: '#F1F4F5',
  },
  dark: {
    axisText: '#C4CCDD',
    grid: '#1C2A44',
    tooltipBg: '#1C2A48',
    tooltipBorder: '#2B3C5C',
    tooltipText: '#F4F6FA',
    tooltipMuted: '#8B96B2',
    labelText: '#F4F6FA',
    cursorFill: '#111B2E',
  },
}

// mockData.ts encodes pipeline bar colors as fixed light-theme hex values
// (e.g. brand-500, success-500). This maps each known light-theme reference
// color to its dark-theme counterpart so bars stay readable against a dark
// card without changing the underlying mock data.
const PIPELINE_DARK_OVERRIDES: Record<string, string> = {
  '#C2CDD1': '#8B96B2', // ink-300 (neutral/draft) -> a visible slate gray
  '#245A73': '#4A89C4', // brand-500 (in progress) -> bright steel blue
  '#16A6B6': '#3FC3D1', // cyan-500 (submitted) -> brighter cyan
  '#C58B2A': '#E3A83D', // warning-500 (under review) -> brighter amber
  '#23845A': '#3FC088', // success-500 (approved) -> brighter green
  '#173B4D': '#5B95CE', // brand-700 (completed) -> lighter, distinguishable blue
}

export function useChartTheme() {
  const { theme } = useTheme()
  const colors = CHART_COLORS[theme]
  return {
    ...colors,
    pipelineColor: (hex: string) => (theme === 'dark' ? PIPELINE_DARK_OVERRIDES[hex] ?? hex : hex),
  }
}
