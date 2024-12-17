import { RepeatType } from '@prisma/client'
import { FamilyMember } from '@/types/family'

export interface Event {
  id: string
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
  members: FamilyMember[]
  onAdd: (event: EventFormData) => void
  onEdit: (id: string, event: EventFormData) => void
  onDelete: (id: string) => void
}

export interface EventFormProps {
  initialData?: Event
  onSubmit: (event: EventFormData) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  members: FamilyMember[]
}
