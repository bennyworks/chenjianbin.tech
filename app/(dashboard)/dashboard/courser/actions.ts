'use server'

import { Schedule, Course, TimeSlot } from '@/types/schedule'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export async function addSchedule(schedule: Schedule) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.schedule.create({
      data: {
        ...schedule,
        userId: user.id,
      },
    })
    return result
  } catch (error) {
    console.error('Error adding schedule:', error)
    throw error
  }
}

export async function updateSchedule(schedule: Schedule) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.schedule.update({
      where: { id: schedule.id },
      data: {
        title: schedule.title,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        location: schedule.location,
      },
    })
    return result
  } catch (error) {
    console.error('Error updating schedule:', error)
    throw error
  }
}

export async function deleteSchedule(scheduleId: string) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    await db.schedule.delete({
      where: { id: scheduleId },
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting schedule:', error)
    throw error
  }
}

export async function addTimeSlot(scheduleId: string, timeSlot: TimeSlot) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.timeSlot.create({
      data: {
        title: timeSlot.title,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        scheduleId,
      },
    })
    return result
  } catch (error) {
    console.error('Error adding time slot:', error)
    throw error
  }
}

export async function updateTimeSlot(scheduleId: string, timeSlot: TimeSlot) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.timeSlot.update({
      where: { id: timeSlot.id },
      data: {
        title: timeSlot.title,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      },
    })
    return result
  } catch (error) {
    console.error('Error updating time slot:', error)
    throw error
  }
}

export async function deleteTimeSlot(scheduleId: string, timeSlotId: string) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    await db.timeSlot.delete({
      where: { id: timeSlotId },
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting time slot:', error)
    throw error
  }
}

export async function addCourse(scheduleId: string, course: Course) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.course.create({
      data: {
        title: course.title,
        description: course.description,
        dayOfWeek: course.dayOfWeek,
        timeSlotId: course.timeSlotId,
        scheduleId,
      },
    })
    return result
  } catch (error) {
    console.error('Error adding course:', error)
    throw error
  }
}

export async function updateCourse(scheduleId: string, course: Course) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const result = await db.course.update({
      where: { id: course.id },
      data: {
        title: course.title,
        description: course.description,
        dayOfWeek: course.dayOfWeek,
        timeSlotId: course.timeSlotId,
      },
    })
    return result
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}

export async function deleteCourse(scheduleId: string, courseId: string) {
  const user = await getCurrentUser()
  if (!user) return

  try {
    await db.course.delete({
      where: { id: courseId },
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}

export async function importSchedule(scheduleId: string, file: File) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Import schedule:', scheduleId, file)
  // TODO: Implement the logic to import a schedule
  // const formData = new FormData()
  // formData.append('file', file)
  // await fetch('/api/import-schedule', {
  //   method: 'POST',
  //   body: formData,
  // })
}
