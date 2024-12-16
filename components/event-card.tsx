import { MapPin, Paperclip, Edit2, Trash2, Calendar, ReceiptText, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Event } from '@/types/event'
import { useState } from 'react'
import { FamilyMember } from '@/types/family'

interface EventCardProps {
  event: Event
  members: FamilyMember[]
  onEdit: (event: Event) => void
  onDelete: (id: string) => void
}

const formatTimeRange = (event: Event) => {
  if (event.isAllDay) {
    return `${event.startDate} 全天`
  }
  const startDateTime = `${event.startDate} ${event.startTime}`
  const endDateTime =
    event.endDate && event.endTime
      ? `${event.endDate} ${event.endTime}`
      : new Date(
          new Date(`${event.startDate}T${event.startTime}`).getTime() +
            parseInt(event.duration) * 60 * 60 * 1000
        )
          .toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
          .replace(/\//g, '-')
  return `${startDateTime} - ${endDateTime}`
}

export function EventCard({ event, members, onEdit, onDelete }: EventCardProps) {
  const [showEditForm, setShowEditForm] = useState(false)
  const member = members.find((m) => m.id === event.memberId)

  const handleEdit = (updatedEvent: Event) => {
    onEdit(updatedEvent)
    setShowEditForm(false)
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-start p-6">
          <div className="flex-1">
            <div className="flex items-center justify-start gap-2 mb-1">
              <h3 className="text-xl font-semibold flex items-center">{event.title}</h3>
              {event.repeat !== 'NoRepeat' && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {event.repeat}
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatTimeRange(event)}</span>
              <User className="h-4 w-4 ml-2 mr-1" />
              <span>{member?.name}</span>
            </div>
            {event.location && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </p>
            )}
            {event.description && (
              <div className="flex items-start mb-2">
                <ReceiptText className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            )}
            {event.attachments && event.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full flex items-center">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {event.attachments.length}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
