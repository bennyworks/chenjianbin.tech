import Link from 'next/link'
import Image from 'next/image'

import { env } from '@/env.mjs'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ModuleCard, ModuleCardItem } from '@/components/module-card'

const SLIDE_TEXTS = [
  '随时随地参与在线课程学习',
  '灵活的学习时间，按照自己的节奏学习',
  '加入我们的全球学习者社区',
  '随时获取优质教育资源',
]

const cards: ModuleCardItem[] = [
  {
    id: 1,
    title: '加入 米妮ED，激活你的学习能力',
    imageUrl: '',
    color: 'pink',
  },
  {
    id: 2,
    title: '加入 米妮ED，开启你的教学之旅',
    imageUrl: '',
    color: 'lime',
  },
  {
    id: 3,
    title: '通过 米妮ED, 支持孩子的学习成长',
    imageUrl: '',
    color: 'purple',
  },
]

export default async function IndexPage() {
  return (
    <>
      <section className="container max-w-[64rem] mx-auto space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-loose tracking-wider">
            通过个性化、互动式学习培养孩子在AI时代的关键技能
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            未来教育应注重英语学习、信息筛选、批判性思维与科学精神，帮助孩子在复杂世界中找到真相和正确方向。
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: 'lg' }), 'bg-red-600 hover:bg-red-700')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="container max-w-[64rem] mx-auto space-y-6 py-8 relative">
        <div className="justify-center grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Middle Section - Two Cards */}
          <Card className="col-span-1 md:col-span-6 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/bg-use-computer.png')`,
              }}
            />
            <div className="absolute inset-0 flex items-start justify-center pt-8">
              <Carousel className="relative z-10 w-[320px]">
                <CarouselContent>
                  {SLIDE_TEXTS.map((text, index) => (
                    <CarouselItem key={index}>
                      <Card className="bg-gray-800/40 backdrop-blur-sm shadow-lg border-none">
                        <CardContent className="p-4">
                          <p className="text-md font-medium leading-relaxed text-center text-white">
                            {text}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </Card>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4 md:gap-6">
            {/* Top Card */}
            <Card className="flex-1 bg-[#E8F94C] relative overflow-hidden min-h-[180px] md:min-h-[190px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/bg-green-1.png')`,
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-2"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                      3+
                    </div>
                  </div>
                </div>
                <h2 className="text-lg pt-4 color-black">具备个性化学习指导实践经验的老师</h2>
              </CardContent>
            </Card>

            {/* Bottom Card */}
            <Card className="flex-1 bg-[#E4DEFF] relative overflow-hidden min-h-[180px] md:min-h-[190px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/bg-purple-1.png')`,
                }}
              />
              <CardContent className="p-6 relative z-10 color-black">
                <h2 className="text-lg">每个孩子都需要重塑由AI驱动的学习方式和方法</h2>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Background Image Card */}
          <Card className="col-span-1 md:col-span-3 overflow-hidden h-[300px] md:h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/bg-course.png')`,
              }}
            />
            <CardContent className="relative p-2 h-full flex flex-col justify-end">
              <div className="bg-white/70 backdrop-blur-sm p-4 w-full rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">数学</h3>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-600">初学者</div>
                  <div className="text-sm font-medium text-gray-900">12 周</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section
        id="students"
        className="container max-w-[64rem] mx-auto py-8 md:py-12 lg:py-24 relative"
      >
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center gap-8">
          {/* Icon */}
          <div className="h-8 w-8">
            <Image
              src="/images/icons/red-stroke-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-full w-full"
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              已有<span className="font-extrabold italic text-4xl text-red-500">20 </span>
              位以上的孩子
            </h2>
            <p className="text-xl mt-4 text-muted-foreground">从该课程中学到提升效率的方法</p>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 w-16">
                <Image
                  src={`/images/schools/logo-${i + 1}.png`}
                  alt={`孩子所属学校 logo ${i + 1}`}
                  className="object-contain"
                  width={64}
                  height={64}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="modules" className="container max-w-[64rem] mx-auto py-8 md:py-12 lg:py-24">
        <ModuleCard cards={cards} />
      </section>
    </>
  )
}
