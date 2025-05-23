export interface TimeSlot {
  id: string
  title: string
  startTime: string
  endTime: string
  scheduleId?: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  timeSlotId: string
  dayOfWeek: number
  scheduleId?: string
}

export interface Schedule {
  id: string
  title: string
  startDate: string
  endDate: string
  location: string
  timeSlots: TimeSlot[]
  courses: Course[]
}
