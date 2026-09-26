import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function localDateString(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Pulls the leading signed decimal out of strings like "0.5 kg", "±0.005 kg"
// or "2.001 kg" so displayed values can be used in a live calculation.
export function parseKg(value: string): number | null {
  const match = value.match(/-?\d+(\.\d+)?/)
  return match ? parseFloat(match[0]) : null
}

export function formatSignedKg(value: number, decimals = 3, unit = 'kg'): string {
  const sign = value > 0 ? '+' : value < 0 ? '' : '+'
  return `${sign}${value.toFixed(decimals)} ${unit}`
}
