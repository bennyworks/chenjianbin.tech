'use client'

import { useState } from 'react'
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
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined)

  const filteredEvents = initialEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = async (data: EventFormData) => {
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      endDate: data.endDate ? data.endDate : data.startDate,
      endTime: data.endTime ? data.endTime : data.startTime,
      ...data,
    }
    setEvents([...events, newEvent])
    await onAddEvent(newEvent)
    setFormOpen(false)
  }

  const handleEdit = async (data: EventFormData) => {
    if (!editingEvent?.id) return
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? { ...event, ...data } : event
    )

    setEvents(updatedEvents)
    await onEditEvent(editingEvent.id, data)
    setEditingEvent(undefined)
  }

  const handleDelete = async (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
    await onDeleteEvent(id)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
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
          onEdit={(event) => setEditingEvent(event)}
          onDelete={handleDelete}
        />
      ))}

      <EventForm
        members={members}
        open={formOpen || !!editingEvent}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingEvent(undefined)
        }}
        onSubmit={editingEvent ? handleEdit : handleAdd}
        initialData={editingEvent ? editingEvent : undefined}
      />
    </div>
  )
}
