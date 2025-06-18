import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { env } from '@/env.mjs'
import { Lunar } from 'lunar-javascript'

export function getSolarToLunar(date: string): string {
  const d = new Date(date)
  const lunar = Lunar.fromDate(d)
  const solar = lunar.getSolar()

  // Get lunar festivals
  const festivals = lunar.getFestivals()
  if (festivals.length > 0) {
    return festivals[0]
  }

  // Get solar festivals
  const solarFestivals = solar.getFestivals()
  if (solarFestivals.length > 0) {
    return solarFestivals[0]
  }

  // Get traditional festivals (节气)
  const jieQi = lunar.getJieQi()
  if (jieQi) {
    return jieQi
  }

  // If no festival, return lunar date
  return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
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

export function formatTime(input: Date): string {
  const hours = input.getHours()
  const minutes = input.getMinutes() >= 30 ? '30' : '00'
  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes}`
  return currentTime
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
