import Link from 'next/link'
import type { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '注册 | Pulse Analytics',
  description: '注册 Pulse Analytics 账号体验数据分析和舆情监测工具',
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        登录
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.chenjianbin className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">Pulse Analytics</h1>
            <p className="text-sm text-muted-foreground">
              注册账号开始免费 14 天试用
            </p>
          </div>
          <Suspense>
            <UserAuthForm />
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            点击继续，即表示您同意我们的{' '}
            <Link href="/terms" className="hover:text-brand underline underline-offset-4">
              服务条款
            </Link>{' '}
            和{' '}
            <Link href="/privacy" className="hover:text-brand underline underline-offset-4">
              隐私政策
            </Link>
            。
          </p>
        </div>
      </div>
    </div>
  )
}
