import Link from 'next/link'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const CONSTANTS = {
  HERO: {
    TITLE: '通过个性化、互动式学习培养孩子在AI时代的关键技能',
    SUBTITLE:
      '未来教育应注重英语学习、信息筛选、批判性思维与科学精神，帮助孩子在复杂世界中找到真相和正确方向。',
  },
  STUDENTS: {
    COUNT: 20,
    TEXT: '位以上的孩子',
    SUBTEXT: '从该课程中学到提升效率的方法',
  },
}

export default function IndexPage() {
  return (
    <>
      <div className="container max-w-[64rem] mx-auto relative">
        <div className="absolute -left-20 top-20 -z-10">
          <Image
            src="/images/tag-lime.png"
            alt="Decorative lime tag"
            width={150}
            height={150}
            className="opacity-80 w-[120px] md:w-[180px] lg:w-[220px] h-auto"
          />
        </div>
        <div className="absolute -right-20 top-50 -z-10">
          <Image
            src="/images/tag-purple.png"
            alt="Decorative purple tag"
            width={150}
            height={150}
            className="opacity-80 w-[100px] md:w-[150px] lg:w-[200px] h-auto"
          />
        </div>
      </div>
      <section className="container max-w-[64rem] mx-auto space-y-6 py-6 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-normal sm:leading-loose tracking-wider">
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

      <div className="container max-w-[64rem] mx-auto relative">
        <div className="absolute left-2/3 -top-32 -z-10">
          <Image
            src="/images/tag-pink.png"
            alt="Decorative pink tag"
            width={120}
            height={120}
            className="opacity-100 w-[60px] md:w-[80px] lg:w-[100px] h-auto"
          />
        </div>
      </div>

      <section className="container max-w-[64rem] mx-auto py-8">
        <div className="flex flex-col items-center justify-center gap-8">
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
    </>
  )
}
