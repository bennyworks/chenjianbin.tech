import { Star } from 'lucide-react'
import Image from 'next/image'

interface CourseCardProps {
  title: string
  duration: string
  level: string
  imageSrc: string
}

export function CourseCard({ title, duration, level, imageSrc }: CourseCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm">
      <div className="relative">
        <Image
          src={imageSrc || '/placeholder.svg'}
          alt={title}
          width={320}
          height={128}
          className="w-full h-32 object-cover rounded-2xl"
        />
        <div className="absolute top-2 right-2">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{level}</span>
          <span className="font-medium">{duration}</span>
        </div>
      </div>
    </div>
  )
}
