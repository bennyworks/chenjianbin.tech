'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { formatDate, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn'
import { EventForm } from '@/components/event-form'
import { FamilyMember } from '@/types/family'

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  members: FamilyMember[]
  onAddEvent: (data: any) => void
}

export function FamilyCalendar({ className, members, onAddEvent, ...props }: FamilyCalendarProps) {
  const [currentEvents, setCurrentEvents] = React.useState<EventInput[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [selectedDate, setSelectedDate] = React.useState<DateSelectArg | null>(null)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        const calendarEvents = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          allDay: false,
          extendedProps: {
            location: event.location,
            memberId: event.memberId,
            repeat: event.repeat,
            formData: event.formData,
          },
        }))
        setCurrentEvents(calendarEvents)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(currentEvents))
    }
  }, [currentEvents])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo)
    setIsDialogOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleAddEvent = async (data: any) => {
    if (data) {
      onAddEvent({
        ...data,
      })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className={cn('flew w-full', className)} {...props}>
      <FullCalendar
        timeZone="Asia/Shanghai"
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
        initialEvents={currentEvents}
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
          startDate: selectedDate
            ? selectedDate.start.toLocaleString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
            : '',
          startTime: selectedDate
            ? selectedDate.start.toLocaleString('en-CA', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : '',
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
