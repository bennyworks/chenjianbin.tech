import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const BLOG_POSTS = [
  {
    id: 1,
    title: '我的技术博客之旅',
    excerpt: '分享我在技术领域的学习和成长经历，以及我对未来技术发展的思考。',
    date: '2025-05-20',
    category: '技术',
  },
  {
    id: 2,
    title: '前端开发最佳实践',
    excerpt: '探讨现代前端开发中的最佳实践，包括性能优化、代码组织和用户体验设计。',
    date: '2025-05-15',
    category: '前端',
  },
  {
    id: 3,
    title: '我的阅读笔记',
    excerpt: '分享我最近阅读的书籍和文章，以及从中获得的启发和思考。',
    date: '2025-05-10',
    category: '阅读',
  },
]

export default function IndexPage() {
  return (
    <>
      <section className="container max-w-[64rem] mx-auto space-y-6 py-12 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
            欢迎来到我的个人博客
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            在这里，我分享我的技术心得、生活感悟和个人思考
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-primary hover:bg-primary/90'
              )}
            >
              登录
            </Link>
            <Link
              href="#blog-posts"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' })
              )}
            >
              浏览文章
            </Link>
          </div>
        </div>
      </section>

      <section id="blog-posts" className="container max-w-[64rem] mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">最新文章</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-2 text-sm text-muted-foreground">
                {post.date} · {post.category}
              </div>
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <Link 
                href={`#post-${post.id}`} 
                className="mt-4 inline-block text-primary hover:underline"
              >
                阅读更多 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container max-w-[64rem] mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">关于我</h2>
        <p className="max-w-[42rem] mx-auto text-muted-foreground">
          我是陈剑彬，一名热爱技术和写作的开发者。这个博客是我分享知识、记录成长的地方。
          欢迎关注我的博客，一起探索技术与生活的无限可能。
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link 
            href="https://github.com/bennyworks" 
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            target="_blank"
          >
            GitHub
          </Link>
          <Link 
            href="#contact" 
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            联系我
          </Link>
        </div>
      </section>
    </>
  )
}
