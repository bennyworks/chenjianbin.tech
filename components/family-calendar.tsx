'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { formatDate, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn'
import { AddEventDialog } from '@/components/add-event-dialog'
import { EventList } from '@/components/event-list'

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FamilyCalendar({ className, ...props }: FamilyCalendarProps) {
  const [currentEvents, setCurrentEvents] = React.useState<EventApi[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [newEventTitle, setNewEventTitle] = React.useState<string>('')
  const [selectedDate, setSelectedDate] = React.useState<DateSelectArg | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saveedEvents = JSON.parse(localStorage.getItem('events') || '[]')
      if (saveedEvents) {
        setCurrentEvents(saveedEvents)
      }
    }
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setNewEventTitle('')
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar
      calendarApi.unselect()

      const newEvent = {
        id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate?.start,
        end: selectedDate?.end,
        allDay: selectedDate?.allDay,
      }

      calendarApi.addEvent(newEvent)
      handleCloseDialog()
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300">
        <div className="w-full sm:w-9/12 px-2">
          <FullCalendar
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
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('events') || '[]')
                : []
            }
            contentHeight="auto"
            dayHeaderClassNames="text-sm font-medium"
            dayCellClassNames="text-sm"
            eventClassNames="text-sm font-medium"
            titleFormat={{ year: 'numeric', month: 'long' }}
            views={{
              dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'long' },
                dayHeaderFormat: { weekday: 'short' },
              },
              timeGridWeek: {
                titleFormat: { year: 'numeric', month: 'long' },
                dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric' },
              },
              timeGridDay: {
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
              },
            }}
          ></FullCalendar>
        </div>
        <div className="w-full mt-8 sm:mt-0 sm:w-3/12 px-2">
          <EventList events={currentEvents} />
        </div>
      </div>
      <AddEventDialog
        title={newEventTitle}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClick={handleAddEvent}
        onTitleChange={(e) => setNewEventTitle(e.target.value)}
      />
    </div>
  )
}
