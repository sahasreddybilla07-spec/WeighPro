import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}
