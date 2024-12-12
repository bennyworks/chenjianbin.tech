import { DashboardConfig } from 'types'
import { Icons } from '@/components/icons'
import { set } from 'zod'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  LifeBuoy,
  Send,
  Share,
} from 'lucide-react'

export const dashboardConfig: DashboardConfig = {
  navMain: [
    {
      title: 'Documentation',
      href: '#',
      icon: BookOpen,
      isActive: true,
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
      icon: Frame,
    },
    {
      title: '日程管理',
      href: '/dashboard/scheduler',
      icon: PieChart,
    },
    {
      title: 'Travel',
      href: '#',
      icon: Map,
    },
  ],
}
