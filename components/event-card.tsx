import { Ellipsis, Edit, Trash, MapPin, Paperclip, Calendar, ReceiptText, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div className="flex items-center justify-start gap-2 mb-1">
            <h3 className="font-semibold flex items-center">{event.title}</h3>
            {event.repeat !== 'NoRepeat' && <Badge variant="secondary">{event.repeat}</Badge>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(event)}>
                <Edit className="mr-2 h-4 w-4" />
                编辑
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => event.id && onDelete(event.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex items-start p-6 pt-0">
          <div className="flex-1">
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
        </CardContent>
      </Card>
    </div>
  )
}
