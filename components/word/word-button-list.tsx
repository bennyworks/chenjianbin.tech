import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Word } from '@/types/word'

interface WordButtonListProps {
  words: Word[]
  onSelectWord: (word: Word) => void
}

export function WordButtonList({ words, onSelectWord }: WordButtonListProps) {
  return (
    <div className="relative mb-6 font-serif">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {words.map((word) => (
            <CarouselItem key={word.id} className="pl-2 basis-auto">
              <Button
                variant="outline"
                className="h-9 px-4 rounded-full text-sm"
                onClick={() => onSelectWord(word)}
              >
                {word.word}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  )
}
