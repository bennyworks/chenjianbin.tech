import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { DashboardShell } from '@/components/shell'
import { FamilyCalendar } from '@/components/family-calendar'
import { CollapsibleTabs } from '@/components/collapsible-tabs'
import { Settings, Users, ListTodo } from 'lucide-react'
import { FamilyList } from '@/components/family-list'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { FamilyMemberFormData, LifeStage, MemberType } from '@/types/family'
import { EventList } from '@/components/event-list'
import { Event, EventFormData } from '@/types/event'

async function handleAddMember(data: FamilyMemberFormData) {
  'use server'

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check if user has a family record
  let family = await db.family.findFirst({
    where: {
      ownerId: user.id,
    },
  })

  // If no family exists, create one
  if (!family) {
    family = await db.family.create({
      data: {
        ownerId: user.id,
        name: `${user.name || 'My'}'s Family`,
      },
    })
  }

  // Create the member
  await db.member.create({
    data: {
      name: data.name,
      type: data.type,
      age: data.age,
      birthday: data.birthday,
      lifeStage: data.lifeStage,
      userId: user.id,
      familyId: family.id,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

async function handleEditMember(id: string, data: FamilyMemberFormData) {
  'use server'

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  await db.member.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      name: data.name,
      type: data.type,
      age: data.age,
      lifeStage: data.lifeStage,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

async function handleDeleteMember(id: string) {
  'use server'

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  await db.member.delete({
    where: {
      id: id,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

async function handleAddEvent(data: EventFormData) {
  'use server'

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  try {
    const newEvent = {
      title: data.title,
      startTime: new Date(`${data.startDate}T${data.startTime}`),
      endTime: new Date(`${data.endDate || data.startDate}T${data.endTime || data.startTime}`),
      location: data.location,
      repeat: data.repeat,
      memberId: data.memberId,
      formData: JSON.stringify(data),
      userId: user.id,
    }

    console.log(newEvent)

    await db.event.create({
      data: newEvent,
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to add event:', error)
  }
}

async function handleEditEvent(id: string, data: EventFormData) {
  'use server'

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  try {
    const newEvent = {
      title: data.title,
      startTime: new Date(`${data.startDate}T${data.startTime}`),
      endTime: new Date(`${data.endDate || data.startDate}T${data.endTime || data.startTime}`),
      location: data.location,
      repeat: data.repeat,
      memberId: data.memberId,
      formData: JSON.stringify(data),
    }

    console.log(newEvent)

    await db.event.update({
      where: { id: id },
      data: newEvent,
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to edit event:', error)
  }
}

async function handleDeleteEvent(id: string) {
  'use server'
  try {
    await db.event.delete({
      where: { id },
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to delete event:', error)
  }
}

export default async function SchedulerPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const members = await db.member
    .findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        birthday: true,
        lifeStage: true,
      },
    })
    .then((members) =>
      members.map((member) => ({
        ...member,
        birthday: member.birthday?.toISOString() || new Date().toISOString(),
      }))
    )

  const events = await db.event
    .findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        location: true,
        repeat: true,
        memberId: true,
        formData: true,
      },
    })
    .then((events) =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        startDate: event.startTime
          ? new Date(event.startTime).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        startTime: event.startTime
          ? new Date(event.startTime).toISOString().split('T')[1].substring(0, 5)
          : '00:00',
        endDate: event.endTime ? new Date(event.endTime).toISOString().split('T')[0] : undefined,
        endTime: event.endTime
          ? new Date(event.endTime).toISOString().split('T')[1].substring(0, 5)
          : undefined,
        duration: '1', // Default duration
        isAllDay: false, // Default value
        location: event.location || undefined,
        reminder: '30', // Default reminder
        repeat: event.repeat,
        memberId: event.memberId,
        formData: event.formData,
      }))
    )

  const tabs = [
    {
      id: 'settings',
      title: '设置',
      icon: <Settings />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">设置</h2>
          <p>事项内容区域</p>
          <p>这里可以列出待办事项或任务列表。</p>
        </div>
      ),
    },
    {
      id: 'family',
      title: '家庭',
      icon: <Users />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">家庭</h2>
          <FamilyList
            initialMembers={members}
            onAdd={handleAddMember}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        </div>
      ),
    },
    {
      id: 'tasks',
      title: '事项',
      icon: <ListTodo />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">事项</h2>
          <EventList
            initialEvents={events}
            members={members}
            onAdd={handleAddEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      ),
    },
  ]

  return (
    <DashboardShell>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 pr-[76px] transition-[padding] duration-300">
          <FamilyCalendar />
        </div>
        <div className="absolute right-0 top-0 bottom-0 z-10">
          <CollapsibleTabs tabs={tabs} className="h-[90vh] bg-white shadow-lg rounded-l-lg" />
        </div>
      </div>
    </DashboardShell>
  )
}
