import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function IndexPage() {
  return (
    <>
      <section className="container flex items-center justify-center min-h-[calc(100vh-10rem)] max-w-[64rem] mx-auto overflow-hidden">
        <div className="flex flex-col items-center gap-8 text-center py-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 px-4 font-heading">
            Pulse Analytics
          </h1>
          <p className="max-w-[42rem] text-base md:text-lg leading-relaxed text-muted-foreground px-4 mt-2">
            模块化的 SaaS 解决方案，帮助用户快速完成数据洞察与业务决策。
          </p>
        </div>
      </section>
    </>
  )
}
