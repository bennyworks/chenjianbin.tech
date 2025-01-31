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
  'Learn anytime, anywhere with our online courses.',
  'Study at your own pace with flexible schedules.',
  'Join our global community of learners.',
  'Access quality education from anywhere.',
]

const cards: ModuleCardItem[] = [
  {
    id: 1,
    title: 'Join My EdSkills To Activate Your Learning',
    imageUrl: '',
    color: 'pink',
  },
  {
    id: 2,
    title: 'Join My EdSkills To Activate Your Teaching',
    imageUrl: '',
    color: 'lime',
  },
  {
    id: 3,
    title: "Support Your Child's Learning Through My skills",
    imageUrl: '',
    color: 'purple',
  },
]

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
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
      <section id="features" className="container space-y-6 py-8 relative">
        <div className="mx-auto justify-center grid grid-cols-1 md:grid-cols-12 gap-6 md:max-w-[64rem]">
          {/* Middle Section - Two Cards */}
          <Card className="col-span-1 md:col-span-6 relative overflow-hidden h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/bg-use-computer.png')`,
              }}
            />
            <div className="absolute inset-0 flex items-end justify-end pb-12 pr-12 bg-black/30">
              <Carousel className="w-[260px]">
                <CarouselContent>
                  {SLIDE_TEXTS.map((text, index) => (
                    <CarouselItem key={index}>
                      <Card className="bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm font-medium">{text}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </Card>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
            {/* Top Card */}
            <Card className="flex-1 bg-[#E8F94C] relative overflow-hidden">
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
            <Card className="flex-1 bg-[#E4DEFF] relative overflow-hidden">
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
          <Card className="col-span-1 md:col-span-3 overflow-hidden h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/bg-course.png')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardContent className="relative h-full flex flex-col justify-end p-4">
              <div className="text-white">
                <h3 className="font-semibold">Math</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-200">For Beginner</p>
                  <div className="text-sm font-medium">12 Weeks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="students" className="container py-8 md:py-12 lg:py-24 relative">
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
      <section id="modules" className="container py-8 md:py-12 lg:py-24 mx-auto md:max-w-[64rem]">
        <ModuleCard cards={cards} />
      </section>
    </>
  )
}
