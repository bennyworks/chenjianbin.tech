import Link from 'next/link'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ModuleCard, ModuleCardItem } from '@/components/module-card'

const CONSTANTS = {
  HERO: {
    TITLE: '通过个性化、互动式学习培养孩子在AI时代的关键技能',
    SUBTITLE:
      '未来教育应注重英语学习、信息筛选、批判性思维与科学精神，帮助孩子在复杂世界中找到真相和正确方向。',
  },
  CAROUSEL_TEXTS: [
    '随时随地参与在线课程学习',
    '灵活的学习时间，按照自己的节奏学习',
    '加入我们的全球学习者社区',
    '随时获取优质教育资源',
  ],
  STUDENTS: {
    COUNT: 20,
    TEXT: '位以上的孩子',
    SUBTEXT: '从该课程中学到提升效率的方法',
  },
}

const MODULE_CARDS: ModuleCardItem[] = [
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

const BackgroundCard = ({
  imageUrl,
  children,
}: {
  imageUrl: string
  children: React.ReactNode
}) => (
  <Card className="relative overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    />
    <div className="relative z-10">{children}</div>
  </Card>
)

export default function IndexPage() {
  return (
    <>
      <section className="container max-w-[64rem] mx-auto space-y-6 py-6 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-loose tracking-wider">
            {CONSTANTS.HERO.TITLE}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {CONSTANTS.HERO.SUBTITLE}
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: 'lg' }), 'bg-red-600 hover:bg-red-700')}
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="container max-w-[64rem] mx-auto space-y-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-6">
            <BackgroundCard imageUrl="/images/bg-use-computer.png">
              <div className="flex items-start justify-center pt-8 h-[400px]">
                <Carousel className="w-[320px]">
                  <CarouselContent>
                    {CONSTANTS.CAROUSEL_TEXTS.map((text, index) => (
                      <CarouselItem key={index}>
                        <Card className="bg-gray-800/40 backdrop-blur-sm shadow-lg border-none">
                          <CardContent className="p-6">
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
            </BackgroundCard>
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col gap-4 md:gap-6">
            <BackgroundCard imageUrl="/images/bg-green-1.png">
              <CardContent className="p-6 h-[190px]">
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                      3+
                    </div>
                  </div>
                </div>
                <h2 className="text-lg">具备个性化学习指导实践经验的老师</h2>
              </CardContent>
            </BackgroundCard>

            <BackgroundCard imageUrl="/images/bg-purple-1.png">
              <CardContent className="p-6 h-[190px] flex">
                <h2 className="text-lg">每个孩子都需要重塑由AI驱动的学习方式和方法</h2>
              </CardContent>
            </BackgroundCard>
          </div>

          <div className="col-span-1 md:col-span-3">
            <BackgroundCard imageUrl="/images/bg-course.png">
              <CardContent className="h-[400px] flex flex-col justify-end p-1">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">数学</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-600">初学者</div>
                    <div className="text-sm font-medium text-gray-900">12 周</div>
                  </div>
                </div>
              </CardContent>
            </BackgroundCard>
          </div>
        </div>
      </section>

      <section className="container max-w-[64rem] mx-auto py-8 md:py-12 lg:py-24">
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="/images/icons/red-stroke-icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              已有
              <span className="font-extrabold italic text-4xl text-red-500">
                {CONSTANTS.STUDENTS.COUNT}{' '}
              </span>
              {CONSTANTS.STUDENTS.TEXT}
            </h2>
            <p className="text-xl mt-4 text-muted-foreground">{CONSTANTS.STUDENTS.SUBTEXT}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src={`/images/schools/logo-${i + 1}.png`}
                alt={`孩子所属学校 logo ${i + 1}`}
                className="object-contain h-16 w-16"
                width={64}
                height={64}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container max-w-[64rem] mx-auto py-8 md:py-12 lg:py-24">
        <ModuleCard cards={MODULE_CARDS} />
      </section>
    </>
  )
}
