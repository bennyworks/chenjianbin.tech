export interface TimeSlot {
  id: string
  title: string
  startTime: string
  endTime: string
}

export interface Course {
  id: string
  title: string
  description: string
  timeSlotId: string
  dayOfWeek: number // 0-6, where 0 is Sunday
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

