'use client'

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Course, TimeSlot } from "../types/schedule"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  title: z.string().min(1, { message: "课程名称不能为空" }),
  description: z.string().optional(),
  timeSlotId: z.string().min(1, { message: "请选择所属节次" }),
  dayOfWeek: z.number().min(0).max(6),
})

interface CourseDialogProps {
  course?: Course
  timeSlots: TimeSlot[]
  open: boolean
  onClose: () => void
  onSave: (course: Partial<Course>) => void
  dayOfWeek?: number
  timeSlotId?: string
  existingCourses: Course[]
}

const daysOfWeek = [
  "周日", "周一", "周二", "周三", "周四", "周五", "周六"
]

export function CourseDialog({
  course,
  timeSlots,
  open,
  onClose,
  onSave,
  dayOfWeek,
  timeSlotId,
  existingCourses,
}: CourseDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      timeSlotId: course?.timeSlotId || timeSlotId || "",
      dayOfWeek: course?.dayOfWeek || dayOfWeek || 1,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: course?.title || "",
        description: course?.description || "",
        timeSlotId: course?.timeSlotId || timeSlotId || "",
        dayOfWeek: course?.dayOfWeek || dayOfWeek || 1,
      })
    }
  }, [open, course, timeSlotId, dayOfWeek, form])

  const validateCourse = (values: z.infer<typeof formSchema>) => {
    const existingCourse = existingCourses.find(
      (c) => c.dayOfWeek === values.dayOfWeek && c.timeSlotId === values.timeSlotId
    );
    if (existingCourse && existingCourse.id !== course?.id) {
      return { error: `该时间段已存在课程 "${existingCourse.title}"，无需重复添加。` };
    }
    return { error: null };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const validation = validateCourse(values);
    if (validation.error) {
      alert(validation.error);
      return;
    }
    onSave(values);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {course ? "编辑课程" : "添加课程"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>课程名称</FormLabel>
                  <FormControl>
                    <Input placeholder="输入课程名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dayOfWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>星期</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择星期" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {daysOfWeek.map((day, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeSlotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所属节次</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择节次" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.id} value={slot.id}>
                          {slot.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>课程描述</FormLabel>
                  <FormControl>
                    <Textarea placeholder="输入课程描述" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button type="submit">
                保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

