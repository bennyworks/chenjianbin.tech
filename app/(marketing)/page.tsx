import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const PRODUCTS = [
  {
    id: 'data-pulse',
    title: 'Data-Pulse',
    description: '基于 LLM 的数据分析工具，支持 CSV/数据库连接、智能报表生成。',
    url: 'https://data-pulse.chenjianbin.tech',
    icon: '/images/data-pulse-icon.svg',
    features: [
      '自然语言查询数据',
      '智能图表可视化',
      '一键导出报表'
    ]
  },
  {
    id: 'biz-pulse',
    title: 'Biz-Pulse',
    description: '企业舆情监测平台，实时爬取新闻/社交媒体，生成情感分析报告。',
    url: 'https://biz-pulse.chenjianbin.tech',
    icon: '/images/biz-pulse-icon.svg',
    features: [
      '实时舆情监测',
      '情感分析报告',
      '关键词告警通知'
    ]
  }
]

const USER_ROLES = [
  {
    title: '企业管理员',
    description: '统一管理团队权限，查看跨应用数据汇总仪表盘。',
    icon: '/images/admin-icon.svg'
  },
  {
    title: '数据分析师',
    description: '在 Data-Pulse 中上传数据，通过自然语言生成可视化图表。',
    icon: '/images/analyst-icon.svg'
  },
  {
    title: '市场经理',
    description: '在 Biz-Pulse 中监测品牌舆情，设置关键词告警通知。',
    icon: '/images/marketing-icon.svg'
  }
]

export default function IndexPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container max-w-[64rem] mx-auto space-y-6 py-12 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
            Pulse Analytics
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            模块化的 SaaS 解决方案，帮助用户快速完成数据洞察与业务决策。
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-primary hover:bg-primary/90'
              )}
            >
              立即登录
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' })
              )}
            >
              免费注册
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container max-w-[64rem] mx-auto py-12 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">我们的产品</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                  {/* 占位图标 */}
                  <div className="w-10 h-10 bg-primary/20 rounded-md" />
                </div>
                <h3 className="text-2xl font-bold">{product.title}</h3>
              </div>
              <p className="mb-4 text-muted-foreground">{product.description}</p>
              <ul className="mb-6 space-y-2">
                {product.features.map((feature, i) => (
                  <li key={`${product.id}-feature-${i}`} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href={product.url} 
                className={cn(buttonVariants({ variant: 'default' }))}
                target="_blank"
              >
                访问 {product.title}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* User Roles Section */}
      <section className="container max-w-[64rem] mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">适用于不同角色</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {USER_ROLES.map((role, i) => (
            <div key={`role-${i}-${role.title}`} className="p-6 border rounded-lg bg-background">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                {/* 占位图标 */}
                <div className="w-8 h-8 bg-primary/20 rounded-md" />
              </div>
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-muted-foreground">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-[64rem] mx-auto py-12 text-center bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">开始使用 Pulse Analytics</h2>
        <p className="max-w-[42rem] mx-auto text-muted-foreground mb-6">
          立即注册并体验我们的数据分析和舆情监测工具。我们提供 14 天免费试用，无需信用卡。
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/register" 
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            免费注册
          </Link>
          <Link 
            href="#contact" 
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
          >
            联系销售
          </Link>
        </div>
      </section>
    </>
  )
}
