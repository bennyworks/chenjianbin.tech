'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn'
import { EventForm } from '@/components/event-form'
import { FamilyMember } from '@/types/family'
import { Event } from '@/types/event'

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  members: FamilyMember[]
  events: Event[]
  onAddEvent: (data: any) => void
}

export function FamilyCalendar({
  className,
  members,
  events,
  onAddEvent,
  ...props
}: FamilyCalendarProps) {
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)

  const calendarEvents = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDate + 'T' + event.startTime),
    end: new Date(event.endDate + 'T' + event.endTime),
    allDay: false,
    extendedProps: {
      location: event.location,
      memberId: event.memberId,
      repeat: event.repeat,
      formData: event.formData,
    },
  }))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(currentEvents))
    }
  }, [currentEvents])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo)
    setIsDialogOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    // TODO：查看事项详情
  }

  const handleAddEvent = async (data: any) => {
    if (selectedDate && data) {
      const calendarApi = selectedDate?.view.calendar
      onAddEvent({
        ...data,
      })
      const newEvent = {
        id: data.id,
        title: data.title,
        start: new Date(`${data.startDate}T${data.startTime}`),
        end: new Date(`${data.endDate}T${data.endTime}`),
        allDay: data.isAllDay,
        extendedProps: {
          location: data.location,
          memberId: data.memberId,
          repeat: data.repeat,
          formData: data.formData,
        },
      }
      calendarApi.addEvent(newEvent)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className={cn('flew w-full', className)} {...props}>
      <FullCalendar
        timeZone="local"
        locale={'zh-CN'}
        height={'60vh'}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          today: '今天',
          month: '月',
          week: '周',
          day: '日',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventsSet={(events) =>
          setCurrentEvents(
            events.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start || undefined,
              end: event.end || undefined,
              allDay: event.allDay,
              extendedProps: event.extendedProps,
            }))
          )
        }
        initialEvents={calendarEvents}
        contentHeight="auto"
        dayHeaderClassNames="text-sm font-medium"
        dayCellClassNames="text-sm"
        eventClassNames="text-sm font-medium"
      />

      <EventForm
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddEvent}
        members={members}
        initialData={{
          startDate: selectedDate ? selectedDate.start.toLocaleDateString('en-CA') : '',
          startTime: new Date().toLocaleTimeString('zh-CN').slice(0, 5),
          endDate: selectedDate ? selectedDate.start.toLocaleDateString('en-CA') : '',
          endTime: new Date().toLocaleTimeString('zh-CN').slice(0, 5),
          isAllDay: false,
          title: '',
          memberId: '',
          duration: '1',
          reminder: '15',
          repeat: 'NoRepeat',
        }}
      />
    </div>
  )
}
