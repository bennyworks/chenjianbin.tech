import { Skeleton } from '@/components/ui/skeleton'

export default function SchedulerLoading() {
  return (
    <div className="flex flex-col gap-6 p-2">
      {/* 标题骨架屏 */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>

      {/* 日历表格骨架屏 */}
      <div className="grid grid-cols-7 gap-2">
        {/* 星期标题 */}
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-8" />
        ))}

        {/* 日期单元格 */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={`cell-${i}`} className="h-[120px] p-1">
            <div className="flex h-full flex-col gap-1">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
