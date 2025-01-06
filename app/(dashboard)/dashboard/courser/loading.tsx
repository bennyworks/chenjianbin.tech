import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      {/* Schedule Header Loading */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Time Slots Loading */}
      <div className="grid grid-cols-6 gap-4 mt-4">
        <div className="col-span-1">
          <Skeleton className="h-24 w-full" />
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="col-span-1">
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>

      {/* Course Grid Loading */}
      <div className="grid grid-cols-6 gap-4 mt-4">
        {[...Array(30)].map((_, index) => (
          <div key={index} className="col-span-1">
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}