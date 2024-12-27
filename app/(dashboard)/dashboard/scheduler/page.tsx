import { getCurrentUser } from '@/lib/session'
import { DashboardShell } from '@/components/shell'
import { FamilyCalendar } from '@/components/family-calendar'
import { CollapsibleTabs } from '@/components/collapsible-tabs'
import { Settings, Users, ListTodo } from 'lucide-react'
import { MemberList } from '@/components/member-list'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { EventList } from '@/components/event-list'
import {
  handleAddMember,
  handleEditMember,
  handleDeleteMember,
  handleAddEvent,
  handleEditEvent,
  handleDeleteEvent,
} from './actions'

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
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then((members) =>
      members.map((member) => ({
        ...member,
        birthday:
          member.birthday?.toLocaleDateString('en-CA') || new Date().toLocaleDateString('en-CA'),
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
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then((events) =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        startDate: new Date(event.startTime).toLocaleDateString('en-CA'),
        startTime: new Date(event.startTime).toLocaleTimeString('zh-CN').slice(0, 5),
        endDate: new Date(event.endTime).toLocaleDateString('en-CA'),
        endTime: new Date(event.endTime).toLocaleTimeString('zh-CN').slice(0, 5),
        location: event.location ? event.location : '',
        repeat: event.repeat ? event.repeat : 'NoRepeat',
        memberId: event.memberId,
        duration: event.formData ? JSON.parse(String(event.formData)).duration : '1',
        reminder: event.formData ? JSON.parse(String(event.formData)).reminder : '15',
        isAllDay: event.formData ? JSON.parse(String(event.formData)).isAllDay : false,
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
          <h2 className="text-lg font-semibold"></h2>
          <p>事项内容区域</p>
          <p>这里可以列出待办事项或任务列表。</p>
        </div>
      ),
    },
    {
      id: 'family',
      title: '家庭成员',
      icon: <Users />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">家庭</h2>
          <MemberList
            initialMembers={members}
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        </div>
      ),
    },
    {
      id: 'tasks',
      title: '事项列表',
      icon: <ListTodo />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">事项</h2>
          <EventList
            members={members}
            initialEvents={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      ),
    },
  ]

  return (
    <DashboardShell>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 pr-[76px] transition-[padding] duration-300">
          <FamilyCalendar
            members={members}
            initialEvents={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 z-10">
          <CollapsibleTabs tabs={tabs} className="h-[90vh] bg-white shadow-lg rounded-l-lg" />
        </div>
      </div>
    </DashboardShell>
  )
}
