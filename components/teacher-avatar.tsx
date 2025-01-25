import Image from 'next/image'

interface TeacherAvatarProps {
  src: string
  className?: string
}

export function TeacherAvatar({ src, className = '' }: TeacherAvatarProps) {
  return (
    <div className={`w-8 h-8 rounded-full overflow-hidden border-2 border-white ${className}`}>
      <Image 
        src={src || '/placeholder.svg'} 
        alt="Teacher" 
        className="w-full h-full object-cover"
        width={32}
        height={32}
      />
    </div>
  )
}
