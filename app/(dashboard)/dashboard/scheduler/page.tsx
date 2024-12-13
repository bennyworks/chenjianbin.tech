import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { DashboardShell } from '@/components/shell'
import { DashboardHeader } from '@/components/header'
import { FamilyCalendar } from '@/components/family-calendar'
import { CollapsibleTabs } from '@/components/collapsible-tabs'
import { Settings, Users, ListTodo } from 'lucide-react'

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
          <p>家庭内容区域</p>
          <p>这里可以显示家庭成员信息或相关功能。</p>
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
