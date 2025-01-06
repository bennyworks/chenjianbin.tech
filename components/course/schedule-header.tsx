'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, MoreVertical, Plus, Trash, Edit, Calendar, Upload } from 'lucide-react'
import { Schedule } from '@/types/schedule'
import { Switch } from '@/components/ui/switch'
import { format, getWeek } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface ScheduleHeaderProps {
  schedules: Schedule[]
  currentSchedule: Schedule
  onScheduleChange: (scheduleId: string) => void
  onAddSchedule: () => void
  onDeleteSchedule: () => void
  onAddCourse: () => void
  onEditSchedule: () => void
  onImportSchedule: () => void
  showCurrentDate: boolean
  onToggleShowCurrentDate: () => void
}

export function ScheduleHeader({
  schedules,
  currentSchedule,
  onScheduleChange,
  onAddSchedule,
  onDeleteSchedule,
  onAddCourse,
  onEditSchedule,
  onImportSchedule,
  showCurrentDate,
  onToggleShowCurrentDate,
}: ScheduleHeaderProps) {
  const currentDate = new Date()
  const weekNumber = getWeek(currentDate)
  const year = format(currentDate, 'yyyy')

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-black text-white hover:bg-black hover:text-gray-200"
            >
              {currentSchedule.title} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {schedules.map((schedule) => (
              <DropdownMenuItem key={schedule.id} onClick={() => onScheduleChange(schedule.id)}>
                {schedule.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onAddSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              添加课程表
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onImportSchedule}>
              <Upload className="h-4 w-4 mr-2" />
              导入课程表
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEditSchedule}>
              <Edit className="h-4 w-4 mr-2" />
              编辑课程表
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteSchedule} className="text-destructive">
              <Trash className="h-4 w-4 mr-2 text-destructive" />
              删除课程表
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center mr-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  显示当前日期
                </div>
                <Switch checked={showCurrentDate} onCheckedChange={onToggleShowCurrentDate} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-lg font-semibold">
        {year}年第{weekNumber}周
      </div>

      <Button onClick={onAddCourse}>
        <Plus className="h-4 w-4 mr-2" />
        添加课程
      </Button>
    </div>
  )
}
