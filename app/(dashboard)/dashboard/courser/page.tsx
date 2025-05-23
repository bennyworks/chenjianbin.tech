import { CourseSchedule } from '@/components/course-schedule'
import { Schedule, Course, TimeSlot } from '@/types/schedule'
import { getCurrentUser } from '@/lib/session'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  addCourse,
  updateCourse,
  deleteCourse,
  importSchedule,
} from './actions'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const participants = await db.member.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const schedules = await db.schedule.findMany({
    where: {
      userId: user.id,
    },
    include: {
      timeSlots: true,
      courses: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <CourseSchedule
      initialSchedules={schedules}
      participants={participants}
      onAddSchedule={addSchedule}
      onUpdateSchedule={updateSchedule}
      onDeleteSchedule={deleteSchedule}
      onAddTimeSlot={addTimeSlot}
      onUpdateTimeSlot={updateTimeSlot}
      onDeleteTimeSlot={deleteTimeSlot}
      onAddCourse={addCourse}
      onUpdateCourse={updateCourse}
      onDeleteCourse={deleteCourse}
      onImportSchedule={importSchedule}
    />
  )
}
