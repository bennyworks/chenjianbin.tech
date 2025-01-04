'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Plus } from 'lucide-react'
import { Course, TimeSlot } from "../types/schedule"
import { TimeSlotMenu } from "./time-slot-menu"
import { CourseMenu } from "./course-menu"
import { format, addDays, startOfWeek } from 'date-fns'

interface ScheduleGridProps {
  timeSlots: TimeSlot[]
  courses: Course[]
  onAddTimeSlot: () => void
  onEditTimeSlot: (timeSlot: TimeSlot) => void
  onDeleteTimeSlot: (timeSlot: TimeSlot) => void
  onEditCourse: (course: Course) => void
  onDeleteCourse: (course: Course) => void
  onAddCourse: (dayOfWeek: number, timeSlotId: string) => void
  showCurrentDate: boolean
}

export function ScheduleGrid({
  timeSlots,
  courses,
  onAddTimeSlot,
  onEditTimeSlot,
  onDeleteTimeSlot,
  onEditCourse,
  onDeleteCourse,
  onAddCourse,
  showCurrentDate,
}: ScheduleGridProps) {
  const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 })

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Button
          variant="outline"
          className="w-48 font-bold h-[60px] bg-gray-100"
        >
          节次
        </Button>
        {days.map((day, index) => (
          <Button
            key={day}
            variant="outline"
            className="text-md gap-0 flex-1 font-bold flex-col h-[60px]"
          >
            <span>{day}</span>
            {showCurrentDate && (
              <span className="text-xs text-muted-foreground">
                {format(addDays(currentWeekStart, index), 'MM-dd')}
              </span>
            )}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {timeSlots.map((slot) => (
          <div key={slot.id} className="flex gap-4">
            <Card className="w-48 p-2">
              <div className="flex flex-col items-center justify-center h-full relative">
                <div className="absolute top-0 right-0">
                  <TimeSlotMenu
                    timeSlot={slot}
                    onEdit={onEditTimeSlot}
                    onDelete={onDeleteTimeSlot}
                  />
                </div>
                <div className="text-center">
                  <div className="font-medium">{slot.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>
              </div>
            </Card>
            {days.map((day, index) => (
              <Card
                key={`${slot.id}-${index}`}
                className="flex-1 p-2 min-h-[80px] cursor-pointer hover:bg-gray-100 relative group"
                onClick={() => {
                  const existingCourse = courses.find(
                    (c) => c.timeSlotId === slot.id && c.dayOfWeek === index + 1
                  )
                  if (!existingCourse) {
                    onAddCourse(index + 1, slot.id)
                  }
                }}
              >
                {courses
                  .filter(course => course.timeSlotId === slot.id && course.dayOfWeek === index + 1)
                  .map((course) => (
                    <div key={course.id} className="relative h-full">
                      <div className="absolute top-0 right-0">
                        <CourseMenu
                          course={course}
                          onEdit={onEditCourse}
                          onDelete={onDeleteCourse}
                        />
                      </div>
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {courses.filter(course => course.timeSlotId === slot.id && course.dayOfWeek === index + 1).length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        ))}
        <div className="flex gap-4">
          <div className="w-48 flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black text-white"
              onClick={onAddTimeSlot}
              alt="添加节次"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {days.map((_, index) => (
            <div key={index} className="flex-1" />
          ))}
        </div>
      </div>
    </div>
  )
}

