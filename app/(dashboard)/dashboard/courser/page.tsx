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

  const initialSchedule: Schedule = {
    id: '1',
    title: '课程表1',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    location: '教学楼',
    participant: '',
    timeSlots: [
      {
        id: '1',
        title: '1',
        startTime: '08:20',
        endTime: '09:00',
      },
      {
        id: '2',
        title: '2',
        startTime: '09:10',
        endTime: '09:50',
      },
    ],
    courses: [
      {
        id: '1',
        title: '班会',
        description: '班级会议',
        timeSlotId: '1',
        dayOfWeek: 1,
      },
      {
        id: '2',
        title: '语文',
        description: '语文课程',
        timeSlotId: '2',
        dayOfWeek: 2,
      },
    ],
  }

  return (
    <CourseSchedule
      initialSchedules={[initialSchedule]}
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
