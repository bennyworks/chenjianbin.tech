import { RepeatType } from '@prisma/client'
import { Member } from '@/types/family'
import { JsonValue } from 'next-auth/adapters'

export interface Event {
  id?: string
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  duration: string
  isAllDay: boolean
  location?: string
  description?: string
  reminder: string
  repeat: RepeatType
  attachments?: File[]
  memberId: string
  formData?: JsonValue
}

export interface EventFormData {
  title: string
  startDate: string
  startTime: string
  endDate?: string
  endTime?: string
  duration: string
  isAllDay: boolean
  location?: string
  description?: string
  reminder: string
  repeat: RepeatType
  attachments?: File[]
  memberId: string
}

export interface EventListProps {
  initialEvents?: Event[]
  members: Member[]
  onAddEvent: (event: EventFormData) => Promise<void>
  onEditEvent: (id: string, event: EventFormData) => Promise<void>
  onDeleteEvent: (id: string) => Promise<void>
}

export interface EventFormProps {
  initialData?: Event
  onSubmit: (event: EventFormData) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  members: Member[]
}
