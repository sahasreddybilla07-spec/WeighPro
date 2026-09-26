import { useTheme } from '../context/ThemeContext'

// Recharts renders to SVG and can't read Tailwind classes, so chart color
// values are mirrored here from the CSS custom properties in src/index.css.
const CHART_COLORS = {
  light: {
    axisText: '#46565B',
    grid: '#E0E9E6',
    tooltipBg: '#FFFFFF',
    tooltipBorder: '#CFE0DA',
    tooltipText: '#19332F',
    tooltipMuted: '#657A74',
    labelText: '#19332F',
    cursorFill: '#EDF6F2',
  },
  dark: {
    axisText: '#C5D9D3',
    grid: '#30494A',
    tooltipBg: '#193437',
    tooltipBorder: '#315554',
    tooltipText: '#F2FAF6',
    tooltipMuted: '#A1BDB4',
    labelText: '#F2FAF6',
    cursorFill: '#183032',
  },
}

// mockData.ts encodes pipeline bar colors as fixed light-theme hex values
// (e.g. brand-500, success-500). This maps each known light-theme reference
// color to its dark-theme counterpart so bars stay readable against a dark
// card without changing the underlying mock data.
const PIPELINE_DARK_OVERRIDES: Record<string, string> = {
  '#C2CDD1': '#91A29F', // draft
  '#245A73': '#40D6B1', // testing
  '#16A6B6': '#45DCE7', // submitted
  '#C58B2A': '#F2BB45', // under review
  '#23845A': '#50D794', // approved
  '#173B4D': '#AE9BFF', // completed
}

const PIPELINE_LIGHT_OVERRIDES: Record<string, string> = {
  '#245A73': '#0E947B',
  '#16A6B6': '#14A7B5',
  '#C58B2A': '#D88A0B',
  '#23845A': '#16864E',
  '#173B4D': '#6950C8',
}

export function useChartTheme() {
  const { theme } = useTheme()
  const colors = CHART_COLORS[theme]
  return {
    ...colors,
    pipelineColor: (hex: string) => (theme === 'dark' ? PIPELINE_DARK_OVERRIDES[hex] ?? hex : PIPELINE_LIGHT_OVERRIDES[hex] ?? hex),
  }
}
