'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EventCard } from '@/components/event-card'
import { EventForm } from '@/components/event-form'
import type { EventFormData } from '@/types/event'
import type { EventListProps, Event } from '@/types/event'

export function EventList({
  initialEvents = [],
  members = [],
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: EventListProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [optingEvent, setOptingEvent] = useState<Event | undefined>(undefined)

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = async (data: EventFormData) => {
    // 添加事项处理函数
    const newEvent: Event = {
      id: Math.random().toString(36),
      ...data,
    }

    setEvents([newEvent, ...events])
    await onAddEvent(newEvent)
    setFormOpen(false)
  }

  const handleEdit = async (data: EventFormData) => {
    // 编辑事项处理函数
    if (!optingEvent?.id) return
    const updatedEvents = events.map((event) =>
      event.id === optingEvent.id ? { ...event, ...data } : event
    )

    setEvents(updatedEvents)
    await onEditEvent(optingEvent.id, data)
    setOptingEvent(undefined)
  }

  const handleDelete = async (id: string) => {
    // 删除事项处理函数
    setEvents(events.filter((event) => event.id !== id))
    await onDeleteEvent(id)
  }

  return (
    <div className="w-full mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 mr-4">
          <Input
            type="search"
            placeholder="搜索事项..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          添加事项
        </Button>
      </div>

      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          members={members}
          onEdit={(event) => setOptingEvent(event)}
          onDelete={handleDelete}
        />
      ))}

      <EventForm
        members={members}
        open={formOpen || !!optingEvent}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setOptingEvent(undefined)
        }}
        onSubmit={optingEvent ? handleEdit : handleAdd}
        initialData={optingEvent ? optingEvent : undefined}
      />
    </div>
  )
}
