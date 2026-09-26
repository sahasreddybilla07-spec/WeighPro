import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}

// Pulls the leading signed decimal out of strings like "0.5 kg", "±0.005 kg"
// or "2.001 kg" so displayed values can be used in a live calculation.
export function parseKg(value: string): number | null {
  const match = value.match(/-?\d+(\.\d+)?/)
  return match ? parseFloat(match[0]) : null
}

export function formatSignedKg(value: number, decimals = 3): string {
  const sign = value > 0 ? '+' : value < 0 ? '' : '+'
  return `${sign}${value.toFixed(decimals)} kg`
}
