import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { env } from '@/env.mjs'
import { Lunar } from 'lunar-javascript'
import { EventFormData } from '@/types/event'

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

export function getDefaultEventData(): EventFormData {
  // 获取默认的事项数据
  const now = new Date()
  const endDateTime = new Date(now.setHours(now.getHours() + 1))

  const event: EventFormData = {
    title: '',
    memberId: '',
    startDate: now.toLocaleDateString('en-CA'),
    startTime: formatTime(now),
    endDate: endDateTime.toLocaleDateString('en-CA'),
    endTime: formatTime(endDateTime),
    duration: '1', // 处理时长1小时
    isAllDay: false, // 非全天
    location: '', // 处理地点
    description: '', // 描述
    reminder: '15', // 提前15分钟提醒
    repeat: 'NoRepeat', // 不重复，即不用按照一定的周期重复处理，
    attachments: [], // 附件
  }
  return event
}
