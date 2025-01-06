'use server'

import { Schedule, Course, TimeSlot } from '@/types/schedule'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export async function addSchedule(schedule: Schedule) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Add schedule:', schedule)
  // TODO: Implement the logic to add a schedule
  // await db.schedule.create({
  //   data: {
  //     ...schedule,
  //     userId: user.id,
  //   },
  // })
}

export async function updateSchedule(schedule: Schedule) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Update schedule:', schedule)
  // TODO: Implement the logic to update a schedule
  // await db.schedule.update({
  //   where: { id: schedule.id },
  //   data: schedule,
  // })
}

export async function deleteSchedule(scheduleId: string) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Delete schedule:', scheduleId)
  // TODO: Implement the logic to delete a schedule
  // await db.schedule.delete({
  //   where: { id: scheduleId },
  // })
}

export async function addTimeSlot(scheduleId: string, timeSlot: TimeSlot) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Add time slot:', scheduleId, timeSlot)
  // TODO: Implement the logic to add a time slot
  // await db.timeSlot.create({
  //   data: {
  //     ...timeSlot,
  //     scheduleId,
  //   },
  // })
}

export async function updateTimeSlot(scheduleId: string, timeSlot: TimeSlot) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Update time slot:', scheduleId, timeSlot)
  // TODO: Implement the logic to update a time slot
  // await db.timeSlot.update({
  //   where: { id: timeSlot.id },
  //   data: timeSlot,
  // })
}

export async function deleteTimeSlot(scheduleId: string, timeSlotId: string) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Delete time slot:', scheduleId, timeSlotId)
  // TODO: Implement the logic to delete a time slot
  // await db.timeSlot.delete({
  //   where: { id: timeSlotId },
  // })
}

export async function addCourse(scheduleId: string, course: Course) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Add course:', scheduleId, course)
  // TODO: Implement the logic to add a course
  // await db.course.create({
  //   data: {
  //     ...course,
  //     scheduleId,
  //   },
  // })
}

export async function updateCourse(scheduleId: string, course: Course) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Update course:', scheduleId, course)
  // TODO: Implement the logic to update a course
  // await db.course.update({
  //   where: { id: course.id },
  //   data: course,
  // })
}

export async function deleteCourse(scheduleId: string, courseId: string) {
  const user = await getCurrentUser()
  if (!user) return

  console.log('Delete course:', scheduleId, courseId)
  // TODO: Implement the logic to delete a course
  // await db.course.delete({
  //   where: { id: courseId },
  // })
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
