'use client'

import { useState } from "react"
import { ScheduleHeader } from "./schedule-header"
import { ScheduleGrid } from "./schedule-grid"
import { DeleteScheduleDialog } from "./delete-schedule-dialog"
import { CourseDialog } from "./course-dialog"
import { TimeSlotDialog } from "./time-slot-dialog"
import { EditScheduleDialog } from "./edit-schedule-dialog"
import { FileUploadDialog } from "./file-upload-dialog"
import { Schedule, Course, TimeSlot } from "../types/schedule"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CourseScheduleProps {
  initialSchedules: Schedule[]
  participants: string[]
  onAddSchedule: (schedule: Schedule) => void
  onUpdateSchedule: (schedule: Schedule) => void
  onDeleteSchedule: (scheduleId: string) => void
  onAddTimeSlot: (scheduleId: string, timeSlot: TimeSlot) => void
  onUpdateTimeSlot: (scheduleId: string, timeSlot: TimeSlot) => void
  onDeleteTimeSlot: (scheduleId: string, timeSlotId: string) => void
  onAddCourse: (scheduleId: string, course: Course) => void
  onUpdateCourse: (scheduleId: string, course: Course) => void
  onDeleteCourse: (scheduleId: string, courseId: string) => void
  onImportSchedule: (scheduleId: string, file: File) => void
}

export function CourseSchedule({
  initialSchedules,
  participants,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onAddTimeSlot,
  onUpdateTimeSlot,
  onDeleteTimeSlot,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onImportSchedule,
}: CourseScheduleProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules)
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>(initialSchedules[0])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseDialogOpen, setCourseDialogOpen] = useState(false)
  const [timeSlotDialogOpen, setTimeSlotDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | undefined>()
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | undefined>()
  const [editScheduleDialogOpen, setEditScheduleDialogOpen] = useState(false)
  const [showCurrentDate, setShowCurrentDate] = useState(false)
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false)
  const [prefilledCourseData, setPrefilledCourseData] = useState<{ dayOfWeek?: number; timeSlotId?: string }>({})
  const [confirmImportDialogOpen, setConfirmImportDialogOpen] = useState(false)

  const handleAddSchedule = () => {
    const newSchedule: Schedule = {
      id: String(Date.now()),
      title: `课程表${schedules.length + 1}`,
      startDate: "",
      endDate: "",
      location: "",
      timeSlots: [],
      courses: [],
    }
    onAddSchedule(newSchedule)
    setSchedules([...schedules, newSchedule])
    setCurrentSchedule(newSchedule)
  }

  const handleDeleteSchedule = () => {
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (schedules.length > 1) {
      onDeleteSchedule(currentSchedule.id)
      const updatedSchedules = schedules.filter(s => s.id !== currentSchedule.id)
      setSchedules(updatedSchedules)
      setCurrentSchedule(updatedSchedules[0])
    }
    setDeleteDialogOpen(false)
  }

  const handleAddCourse = (dayOfWeek?: number, timeSlotId?: string) => {
    if (currentSchedule.timeSlots.length === 0) {
      alert("请先添加节次")
      return
    }
    setEditingCourse(undefined)
    setPrefilledCourseData({ dayOfWeek, timeSlotId })
    setCourseDialogOpen(true)
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setCourseDialogOpen(true)
  }

  const handleDeleteCourse = (course: Course) => {
    onDeleteCourse(currentSchedule.id, course.id)
    const updatedCourses = currentSchedule.courses.filter(c => c.id !== course.id)
    const updatedSchedule = { ...currentSchedule, courses: updatedCourses }
    setCurrentSchedule(updatedSchedule)
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
  }

  const handleSaveCourse = (courseData: Partial<Course>) => {
    const newCourse = {
      id: editingCourse?.id || String(Date.now()),
      title: courseData.title || "",
      description: courseData.description || "",
      timeSlotId: courseData.timeSlotId || "",
      dayOfWeek: courseData.dayOfWeek || 1,
    }

    if (editingCourse) {
      onUpdateCourse(currentSchedule.id, newCourse)
    } else {
      onAddCourse(currentSchedule.id, newCourse)
    }

    const updatedCourses = editingCourse
      ? currentSchedule.courses.map(c => c.id === editingCourse.id ? newCourse : c)
      : [...currentSchedule.courses, newCourse]

    const updatedSchedule = { ...currentSchedule, courses: updatedCourses }
    setCurrentSchedule(updatedSchedule)
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
    setCourseDialogOpen(false)
  }

  const handleAddTimeSlot = () => {
    setEditingTimeSlot(undefined)
    setTimeSlotDialogOpen(true)
  }

  const handleEditTimeSlot = (timeSlot: TimeSlot) => {
    setEditingTimeSlot(timeSlot)
    setTimeSlotDialogOpen(true)
  }

  const handleDeleteTimeSlot = (timeSlot: TimeSlot) => {
    onDeleteTimeSlot(currentSchedule.id, timeSlot.id)
    const updatedTimeSlots = currentSchedule.timeSlots.filter(t => t.id !== timeSlot.id)
    const updatedCourses = currentSchedule.courses.filter(c => c.timeSlotId !== timeSlot.id)
    const updatedSchedule = { ...currentSchedule, timeSlots: updatedTimeSlots, courses: updatedCourses }
    setCurrentSchedule(updatedSchedule)
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
  }

  const handleSaveTimeSlot = (timeSlotData: Partial<TimeSlot>) => {
    const newTimeSlot = {
      id: editingTimeSlot?.id || String(Date.now()),
      title: timeSlotData.title || "",
      startTime: timeSlotData.startTime || "",
      endTime: timeSlotData.endTime || "",
    }

    if (editingTimeSlot) {
      onUpdateTimeSlot(currentSchedule.id, newTimeSlot)
    } else {
      onAddTimeSlot(currentSchedule.id, newTimeSlot)
    }

    const updatedTimeSlots = editingTimeSlot
      ? currentSchedule.timeSlots.map(t => t.id === editingTimeSlot.id ? newTimeSlot : t)
      : [...currentSchedule.timeSlots, newTimeSlot]

    // Sort time slots by title (which is now a number)
    updatedTimeSlots.sort((a, b) => Number(a.title) - Number(b.title))

    const updatedSchedule = { ...currentSchedule, timeSlots: updatedTimeSlots }
    setCurrentSchedule(updatedSchedule)
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
    setTimeSlotDialogOpen(false)
  }

  const handleEditSchedule = () => {
    setEditScheduleDialogOpen(true)
  }

  const handleSaveSchedule = (scheduleData: Partial<Schedule>) => {
    const updatedSchedule = { ...currentSchedule, ...scheduleData }
    onUpdateSchedule(updatedSchedule)
    setCurrentSchedule(updatedSchedule)
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
    setEditScheduleDialogOpen(false)
  }

  const handleToggleShowCurrentDate = () => {
    setShowCurrentDate(!showCurrentDate)
  }

  const handleImportSchedule = () => {
    if (currentSchedule.timeSlots.length > 0 || currentSchedule.courses.length > 0) {
      setConfirmImportDialogOpen(true)
    } else {
      setFileUploadDialogOpen(true)
    }
  }

  const handleConfirmImport = () => {
    setConfirmImportDialogOpen(false)
    setFileUploadDialogOpen(true)
  }

  const handleFileUpload = async (file: File) => {
    try {
      onImportSchedule(currentSchedule.id, file)
      setFileUploadDialogOpen(false)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ScheduleHeader
        schedules={schedules}
        currentSchedule={currentSchedule}
        onScheduleChange={(id) => {
          const schedule = schedules.find(s => s.id === id)
          if (schedule) setCurrentSchedule(schedule)
        }}
        onAddSchedule={handleAddSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onAddCourse={handleAddCourse}
        onEditSchedule={handleEditSchedule}
        onImportSchedule={handleImportSchedule}
        showCurrentDate={showCurrentDate}
        onToggleShowCurrentDate={handleToggleShowCurrentDate}
      />

      <ScheduleGrid
        timeSlots={currentSchedule.timeSlots}
        courses={currentSchedule.courses}
        onAddTimeSlot={handleAddTimeSlot}
        onEditTimeSlot={handleEditTimeSlot}
        onDeleteTimeSlot={handleDeleteTimeSlot}
        onEditCourse={handleEditCourse}
        onDeleteCourse={handleDeleteCourse}
        onAddCourse={handleAddCourse}
        showCurrentDate={showCurrentDate}
      />

      <DeleteScheduleDialog
        schedule={currentSchedule}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <CourseDialog
        course={editingCourse}
        timeSlots={currentSchedule.timeSlots}
        open={courseDialogOpen}
        onClose={() => setCourseDialogOpen(false)}
        onSave={handleSaveCourse}
        dayOfWeek={prefilledCourseData.dayOfWeek}
        timeSlotId={prefilledCourseData.timeSlotId}
        existingCourses={currentSchedule.courses}
      />

      <TimeSlotDialog
        timeSlot={editingTimeSlot}
        open={timeSlotDialogOpen}
        onClose={() => setTimeSlotDialogOpen(false)}
        onSave={handleSaveTimeSlot}
        existingTimeSlots={currentSchedule.timeSlots}
      />

      <EditScheduleDialog
        schedule={currentSchedule}
        open={editScheduleDialogOpen}
        onClose={() => setEditScheduleDialogOpen(false)}
        onSave={handleSaveSchedule}
        participants={participants}
      />

      <FileUploadDialog
        open={fileUploadDialogOpen}
        onClose={() => setFileUploadDialogOpen(false)}
        onUpload={handleFileUpload}
      />

      <AlertDialog open={confirmImportDialogOpen} onOpenChange={setConfirmImportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认导入</AlertDialogTitle>
            <AlertDialogDescription>
              导入的数据将覆盖当前的课程表。是否确认继续导入？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmImport}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

