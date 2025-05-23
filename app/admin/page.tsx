import { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: '博客管理',
  description: '个人博客后台管理页面',
}

export default function AdminPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">博客管理后台</h1>
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
          返回首页
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">文章管理</h3>
          <p className="text-muted-foreground mb-4">管理您的博客文章，包括创建、编辑和删除文章。</p>
          <Link href="#" className={cn(buttonVariants({ variant: 'default' }))}>
            管理文章
          </Link>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">分类管理</h3>
          <p className="text-muted-foreground mb-4">管理您的博客分类，组织您的内容。</p>
          <Link href="#" className={cn(buttonVariants({ variant: 'default' }))}>
            管理分类
          </Link>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">评论管理</h3>
          <p className="text-muted-foreground mb-4">查看和管理博客文章的评论。</p>
          <Link href="#" className={cn(buttonVariants({ variant: 'default' }))}>
            管理评论
          </Link>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">网站统计</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 shadow">
            <h4 className="text-sm font-medium text-muted-foreground">文章总数</h4>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow">
            <h4 className="text-sm font-medium text-muted-foreground">评论总数</h4>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow">
            <h4 className="text-sm font-medium text-muted-foreground">访问量</h4>
            <p className="text-3xl font-bold">42</p>
          </div>
        </div>
      </div>
    </div>
  )
}
