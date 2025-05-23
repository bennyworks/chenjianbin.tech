import { Metadata } from 'next'
import { UserNav } from '@/components/user-nav'

export const metadata: Metadata = {
  title: '博客管理',
  description: '个人博客后台管理页面',
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">陈剑彬的博客后台</h1>
          </div>
          <UserNav />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
