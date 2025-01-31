import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import '@/styles/module-card.css'

const moduleColors = {
  pink: '#FFB5B5',
  lime: '#E2FF87',
  purple: '#E0D6FF',
} as const

export interface ModuleCardItem {
  id: number
  title: string
  imageUrl: string
  color: keyof typeof moduleColors
}

interface ModuleCardProps {
  cards: ModuleCardItem[]
}

export function ModuleCard({ cards }: ModuleCardProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className={`overflow-hidden transition-transform hover:scale-105 relative`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/bg-${card.color}-grid.png')`,
              }}
            />
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 relative z-10">
              <h3 className="text-xl font-bold leading-tight pr-8">{card.title}</h3>
              <button className="rounded-full p-2 bg-white hover:bg-white/70 transition-colors">
                <ArrowRight className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="p-2 relative z-10">
              <div
                className={`aspect-[4/3] overflow-hidden rounded-lg ${getImageClasses(index, cards.length)}`}
              >
                <Image
                  src={card.imageUrl || '/images/placeholder.jpg'}
                  alt=""
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getImageClasses(index: number, totalCards: number): string {
  if (index === 0) {
    return 'clip-path-left-rounded'
  } else if (index === totalCards - 1) {
    return 'clip-path-right-rounded'
  }
  return 'rounded-lg'
}
