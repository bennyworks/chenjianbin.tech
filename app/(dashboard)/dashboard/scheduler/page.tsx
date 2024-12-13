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

export default async function SchedulerPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const tabs = [
    {
      id: 'settings',
      title: '设置',
      icon: <Settings />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">设置</h2>
          <p>设置内容区域</p>
          <p>这里可以放置各种设置选项。</p>
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
          <p>事项内容区域</p>
          <p>这里可以列出待办事项或任务列表。</p>
        </div>
      ),
    },
  ]

  return (
    <DashboardShell>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 pr-[60px]">
          <FamilyCalendar />
        </div>
        <div className="absolute right-0 top-0 bottom-0 z-10">
          <CollapsibleTabs
            tabs={tabs}
            className="h-full bg-white shadow-lg rounded-l-lg"
            style={{ minWidth: '60px' }}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
