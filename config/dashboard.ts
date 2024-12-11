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
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
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
      title: 'Design Engineering',
      href: '#',
      icon: Frame,
    },
    {
      title: 'Sales & Marketing',
      href: '#',
      icon: PieChart,
    },
    {
      title: 'Travel',
      href: '#',
      icon: Map,
    },
  ],
}
