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

const SLIDE_TEXTS = [
  'Learn anytime, anywhere with our online courses.',
  'Study at your own pace with flexible schedules.',
  'Join our global community of learners.',
  'Access quality education from anywhere.',
]

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            通过个性化、互动式学习
            <br />
            培养孩子在AI时代的关键技能
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
        {/* grid background */}
        <div
          className="absolute -z-10 inset-0 mx-auto md:h-[600px] md:w-[80rem]
    bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
    bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"
        ></div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent lg:py-12 relative"
      >
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
            <Card className="flex-1 bg-[#E8F94C]">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-2"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                      40+
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Professional Teachers</h2>
              </CardContent>
            </Card>

            {/* Bottom Card */}
            <Card className="flex-1 bg-[#E4DEFF]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Every child deserves the chance to learn</h2>
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
      <section id="open-source" className="container py-8 md:py-12 lg:py-24 relative">
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
              已有<span className="text-red-600">20+</span>位孩子
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
        {/* grid background */}
        <div
          className="absolute -z-10 inset-0 mx-auto md:h-[400px] md:w-[80rem]
    bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
    bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"
        ></div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br /> The code is
            available on{' '}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{' '}
          </p>
        </div>
      </section>
    </>
  )
}
