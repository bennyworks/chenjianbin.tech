import type { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '登录 | Pulse Analytics',
  description: '登录到 Pulse Analytics 平台访问数据分析和舆情监测工具',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          返回首页
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.chenjianbin className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Pulse Analytics</h1>
          <p className="text-sm text-muted-foreground">
            登录您的账户访问数据分析和舆情监测工具
          </p>
        </div>
        <Suspense>
          <UserAuthForm />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            还没有账户？立即注册
          </Link>
        </p>
      </div>
    </div>
  )
}
