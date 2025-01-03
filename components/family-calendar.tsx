'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { cn, getSolarToLunar, getDefaultEventData } from '@/lib/utils'
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn'
import { EventForm } from '@/components/event-form'
import { Member } from '@/types/family'
import { Event, EventFormData } from '@/types/event'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { EventCard } from './event-card'
import { toast } from 'sonner'
import { generateCUID } from '@/lib/cuid'

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  members: Member[]
  initialEvents: Event[]
  onAddEvent: (data: any) => Promise<void>
  onEditEvent: (id: string, data: any) => Promise<void>
  onDeleteEvent: (id: string) => Promise<void>
}

export function FamilyCalendar({
  className,
  members,
  initialEvents,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  ...props
}: FamilyCalendarProps) {
  const [events, setEvents] = useState<EventInput[]>(
    initialEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(`${event.startDate}T${event.startTime}`),
      end: new Date(`${event.endDate}T${event.endTime}`),
      allDay: event.isAllDay,
      extendedProps: {
        formData: event.formData,
      },
    }))
  )
  const [isEventFormDialogOpen, setIsEventFormDialogOpen] = useState<boolean>(false)
  const [isEventCardDialogOpen, setIsEventCardDialogOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
  const [clickedEvent, setClickedEvent] = useState<EventClickArg | null>(null)
  const [optingEvent, setOptingEvent] = useState<Event | null>(null)

  useEffect(() => {
    setEvents(
      initialEvents.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(`${event.startDate}T${event.startTime}`),
        end: new Date(`${event.endDate}T${event.endTime}`),
        allDay: event.isAllDay,
        extendedProps: {
          formData: event.formData,
        },
      }))
    )
  }, [initialEvents])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // 选择日期处理函数
    setSelectedDate(selectInfo)
    const newEvent = getDefaultEventData(selectInfo.start)
    setOptingEvent(newEvent)
    setIsEventFormDialogOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    // 点击事项处理函数
    setClickedEvent(clickInfo) // 保存点击的事件

    if (!clickInfo.event.start) {
      toast.error('该事项未正确设置开始时间!')
      return
    }

    let startDate = clickInfo.event.start.toLocaleDateString('en-CA')
    let startTime = clickInfo.event.start.toLocaleTimeString('zh-CN')
    let endDate = clickInfo.event.end?.toLocaleDateString('en-CA')
    let endTime = clickInfo.event.end?.toLocaleTimeString('zh-CN')

    if (clickInfo.event.allDay) {
      // 全天事项
      startDate = clickInfo.event.start.toLocaleDateString('en-CA')
      startTime = '00:00'
      endDate = startDate
      endTime = '23:59'
    } else if (!clickInfo.event.end) {
      toast.error('该事项未正确设置结束时间!')
      return
    } else {
      endDate = clickInfo.event.end.toLocaleDateString('en-CA')
      endTime = clickInfo.event.end.toLocaleTimeString('zh-CN')
    }

    // 获取事项的详情数据
    const formData = JSON.parse(clickInfo.event.extendedProps.formData)

    setOptingEvent({
      // 设置选中的事项
      id: clickInfo.event.id as string,
      title: clickInfo.event.title,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      isAllDay: clickInfo.event.allDay,
      location: formData.location,
      memberId: formData.memberId,
      repeat: formData.repeat,
      duration: formData.duration,
      reminder: formData.reminder,
    })

    setIsEventCardDialogOpen(true) // 打开事项详情卡片
  }

  const handleAddEvent = async (data: EventFormData) => {
    if (selectedDate && data) {
      const calendarApi = selectedDate?.view.calendar
      const newEvent = {
        id: generateCUID(),
        title: data.title,
        start: new Date(`${data.startDate}T${data.startTime}`),
        end: new Date(`${data.endDate}T${data.endTime}`),
        allDay: data.isAllDay,
        extendedProps: {
          formData: JSON.stringify(data),
        },
      }
      calendarApi.addEvent(newEvent)

      try {
        setIsEventFormDialogOpen(false)
        await onAddEvent({ id: newEvent.id, ...data })
        toast.success('事项已成功添加')
      } catch (error) {
        toast.error('添加失败，请重试')
      }
    }
  }

  const handleEditEvent = async (data: EventFormData) => {
    if (clickedEvent && optingEvent && data) {
      try {
        setIsEventFormDialogOpen(false)
        await onEditEvent(optingEvent.id as string, data) // 更新到数据库
        // 更新日历事项
        const calendarEvent = clickedEvent.view.calendar.getEventById(optingEvent.id as string)
        if (calendarEvent) {
          calendarEvent.setProp('title', data.title)
          calendarEvent.setProp('start', new Date(`${data.startDate}T${data.startTime}`))
          calendarEvent.setProp('end', new Date(`${data.endDate}T${data.endTime}`))
          calendarEvent.setProp('allDay', data.isAllDay)
          calendarEvent.setProp('extendedProps', {
            formData: JSON.stringify(data),
          })
        }

        toast.success('事项已成功编辑')
      } catch (error) {
        toast.error('编辑失败，请重试')
      }
    }
  }

  const handleEditEventCard = () => {
    // 事项详情卡片编辑处理函数
    setIsEventCardDialogOpen(false)
    setIsEventFormDialogOpen(true)
  }

  const handleDeleteEventCard = async (id: string) => {
    try {
      await onDeleteEvent(id)
      setIsEventCardDialogOpen(false)
      clickedEvent?.view.calendar.getEventById(id)?.remove()
      toast.success('事项已成功删除')
    } catch (error) {
      toast.error('删除失败，请重试')
    }
  }

  return (
    <div className={cn('flew w-full', className)} {...props}>
      <FullCalendar
        timeZone="local"
        locale="zh-cn"
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
        events={events}
        contentHeight="auto"
        dayHeaderClassNames="text-sm font-medium"
        dayCellClassNames="text-sm"
        dayCellContent={(arg) => {
          return (
            <div className="h-full w-full px-1">
              <div className="flex flex-col items-end text-sm">
                <div>{arg.dayNumberText}</div>
                <div className="text-red-300 text-xs">
                  {getSolarToLunar(arg.date.toISOString())}
                </div>
              </div>
            </div>
          )
        }}
        dayMaxEventRows={true}
        eventContent={(arg) => {
          const timeText = !arg.event.allDay
            ? arg.event.start?.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
            : '全天'
          return (
            <div className="text-sm px-1 py-0.5 truncate">
              {timeText && <span className="text-muted-foreground mr-1">{timeText}</span>}
              {arg.event.title}
            </div>
          )
        }}
      />

      <EventForm
        open={isEventFormDialogOpen}
        onOpenChange={setIsEventFormDialogOpen}
        onSubmit={optingEvent?.id ? handleEditEvent : handleAddEvent}
        members={members}
        initialData={optingEvent ? optingEvent : undefined}
      />

      <Dialog open={isEventCardDialogOpen} onOpenChange={setIsEventCardDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>基本信息</DialogTitle>
          </DialogHeader>
          {optingEvent && (
            <EventCard
              className="border-none shadow-none"
              event={optingEvent}
              members={members}
              onEdit={handleEditEventCard}
              onDelete={handleDeleteEventCard}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
