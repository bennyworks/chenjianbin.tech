import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { env } from '@/env.mjs'
import { Lunar } from 'lunar-javascript'

export function getSolarToLunar(date: string): string {
  const d = new Date(date)
  const lunar = Lunar.fromDate(d)
  return `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
