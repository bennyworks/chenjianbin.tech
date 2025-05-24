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
      {/* Hero Section - 增加留白与视觉层次 */}
      <section className="container max-w-[64rem] mx-auto py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 px-4 font-heading">
            Pulse Analytics
          </h1>
          <p className="max-w-[42rem] text-base md:text-lg leading-relaxed text-muted-foreground px-4 mt-2">
            模块化的 SaaS 解决方案，帮助用户快速完成数据洞察与业务决策。
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-4 px-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full px-8 transition-transform hover:scale-105'
              )}
            >
              立即登录
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'rounded-full px-8 border-2 transition-transform hover:scale-105'
              )}
            >
              免费注册
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section - 产品展示部分 */}
      <section id="products" className="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container max-w-[64rem] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center tracking-tight font-heading">我们的产品</h2>
          <div className="grid gap-16 md:gap-24 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-xl bg-card p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-border">
                <div className="flex flex-col space-y-6">
                  <div className="p-3 bg-muted rounded-lg w-16 h-16 flex items-center justify-center">
                    {/* 占位图标 */}
                    <div className="w-10 h-10 bg-primary/10 rounded-md" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">{product.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{product.description}</p>
                  <ul className="my-6 space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={`${product.id}-feature-${i}`} className="flex items-center text-foreground">
                        <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <Link 
                      href={product.url} 
                      className={cn(
                        buttonVariants({ variant: 'default' }),
                        'rounded-md px-4 py-2 text-sm'
                      )}
                      target="_blank"
                    >
                      访问 {product.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section - 角色展示部分 */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-[64rem] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center tracking-tight font-heading">适用于不同角色</h2>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3">
            {USER_ROLES.map((role, i) => (
              <div key={`role-${i}-${role.title}`} className="flex flex-col p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow transition-all duration-300">
                <div className="mb-4 p-2 bg-muted rounded-md w-12 h-12 flex items-center justify-center">
                  {/* 占位图标 */}
                  <div className="w-8 h-8 bg-primary/10 rounded-md" />
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2">{role.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 号召区部分 */}
      <section className="py-24 md:py-32 bg-muted/50">
        <div className="container max-w-[64rem] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight font-heading">开始使用 Pulse Analytics</h2>
          <p className="max-w-[42rem] mx-auto text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            立即注册并体验我们的数据分析和舆情监测工具。我们提供 14 天免费试用，无需信用卡。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link 
              href="/register" 
              className={cn(
                buttonVariants({ size: 'lg' })
              )}
            >
              免费注册
            </Link>
            <Link 
              href="#contact" 
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' })
              )}
            >
              联系销售
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
