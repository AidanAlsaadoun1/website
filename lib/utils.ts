import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Month-precision formatter, for certifications where the source only gives month+year. */
export function formatMonthYear(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
  })
}

export function relativeTime(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input
  const diff = (date.getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ]
  const rtf = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' })
  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diff) >= secondsInUnit || unit === 'second') {
      return rtf.format(Math.round(diff / secondsInUnit), unit)
    }
  }
  return ''
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
