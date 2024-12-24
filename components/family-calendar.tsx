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
import { Member } from '@/types/family'
import { Event } from '@/types/event'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { EventCard } from './event-card'

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  members: Member[]
  events: Event[]
  onAddEvent: (data: any) => void
  onEditEvent: (id: string, data: any) => void
  onDeleteEvent: (id: string) => void
}

export function FamilyCalendar({
  className,
  members,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  ...props
}: FamilyCalendarProps) {
  const [currentEvents, setCurrentEvents] = useState<Event[]>(events)
  const [isEventFormDialogOpen, setIsEventFormDialogOpen] = useState<boolean>(false)
  const [isEventCardDialogOpen, setIsEventCardDialogOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
  const [clickedEvent, setClickedEvent] = useState<Event | null>(null)

  const initialEvents: EventInput[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(`${event.startDate}T${event.startTime}`),
    end: new Date(`${event.endDate}T${event.endTime}`),
    allDay: event.isAllDay,
    extendedProps: {
      location: event.location,
      memberId: event.memberId,
      repeat: event.repeat,
      formData: event.formData,
    },
  }))

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo)
    setIsEventFormDialogOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const clickedEvent: Event = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      startDate: clickInfo.event.start?.toLocaleDateString('en-CA') || '',
      startTime: clickInfo.event.start?.toLocaleTimeString('zh-CN').slice(0, 5) || '',
      endDate: clickInfo.event.end?.toLocaleDateString('en-CA') || '',
      endTime: clickInfo.event.end?.toLocaleTimeString().slice(0, 5) || '',
      isAllDay: clickInfo.event.allDay,
      duration: clickInfo.event.extendedProps.duration,
      reminder: clickInfo.event.extendedProps.reminder,
      location: clickInfo.event.extendedProps.location,
      memberId: clickInfo.event.extendedProps.memberId,
      repeat: clickInfo.event.extendedProps.repeat,
      formData: clickInfo.event.extendedProps.formData,
    }
    setClickedEvent(clickedEvent)
    setIsEventCardDialogOpen(true)
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
      setIsEventFormDialogOpen(false)
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
              startDate: event.start?.toLocaleDateString('en-CA') || '',
              startTime: event.start?.toLocaleTimeString('zh-CN').slice(0, 5) || '',
              endDate: event.end?.toLocaleDateString('en-CA') || '',
              endTime: event.end?.toLocaleTimeString().slice(0, 5) || '',
              isAllDay: event.allDay,
              duration: event.extendedProps.duration,
              reminder: event.extendedProps.reminder,
              location: event.extendedProps.location,
              memberId: event.extendedProps.memberId,
              repeat: event.extendedProps.repeat,
              formData: event.extendedProps.formData,
            }))
          )
        }
        initialEvents={initialEvents}
        contentHeight="auto"
        dayHeaderClassNames="text-sm font-medium"
        dayCellClassNames="text-sm"
        eventClassNames="text-sm font-medium"
      />

      <EventForm
        open={isEventFormDialogOpen}
        onOpenChange={setIsEventFormDialogOpen}
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

      <Dialog open={isEventCardDialogOpen} onOpenChange={setIsEventCardDialogOpen}>
        <DialogContent className="max-w-2xl">
          <EventCard
            className="border-none shadow-none"
            event={clickedEvent as any}
            members={members}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
