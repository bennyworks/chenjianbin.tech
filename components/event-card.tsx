import { MapPin, Paperclip, Edit2, Trash2, Calendar, ReceiptText, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Event } from '@/types/event'
import { Member } from '@/types/family'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  members: Member[]
  onEdit: (event: Event) => void
  onDelete: (id: string) => void
  className?: string
  style?: React.CSSProperties
}

const formatTimeRange = (event: Event) => {
  if (event.isAllDay) {
    return `${event.startDate} 全天`
  }
  const startDateTime = `${event.startDate} ${event.startTime.slice(0, 5)}`
  const endDateTime = `${event.endDate} ${event.endTime.slice(0, 5)}`

  return `${startDateTime} - ${endDateTime}`
}

export function EventCard({ event, members, onEdit, onDelete, className, style }: EventCardProps) {
  const member = members.find((m) => m.id === event.memberId)

  return (
    <div>
      <Card className={cn('', className)}>
        <CardContent className="flex items-start p-6">
          <div className="flex-1">
            <div className="flex items-center justify-start gap-2 mb-1">
              <h3 className="font-semibold flex items-center">{event.title}</h3>
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
            <Button variant="ghost" size="icon" onClick={() => event.id && onDelete(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
