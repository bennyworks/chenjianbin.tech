import { DashboardConfig } from 'types'
import { BookOpen, Settings2, LifeBuoy, Send, Calendar, Home } from 'lucide-react'

export const dashboardConfig: DashboardConfig = {
  navMain: [
    {
      title: 'Documentation',
      href: '#',
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: 'Introduction',
          href: '#',
        },
        {
          title: 'Get Started',
          href: '#',
        },
        {
          title: 'Tutorials',
          href: '#',
        },
        {
          title: 'Changelog',
          href: '#',
        },
      ],
    },
    {
      title: 'Settings',
      href: '#',
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: 'General',
          href: '#',
        },
        {
          title: 'Team',
          href: '#',
        },
        {
          title: 'Billing',
          href: '#',
        },
        {
          title: 'Limits',
          href: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      href: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      href: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      title: '首页',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: '日程管理',
      href: '/dashboard/scheduler',
      icon: Calendar,
    },
  ],
}
