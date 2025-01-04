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
import { Input } from "@/components/ui/input"
import { TimeSlot } from "../types/schedule"
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

const formSchema = z.object({
  title: z.string().min(1, { message: "节次标题不能为空" }).refine((val) => !isNaN(Number(val)), {
    message: "节次标题必须为数字",
  }),
  startTime: z.string().min(1, { message: "开始时间不能为空" }),
  endTime: z.string().min(1, { message: "结束时间不能为空" }),
})

interface TimeSlotDialogProps {
  timeSlot?: TimeSlot
  open: boolean
  onClose: () => void
  onSave: (timeSlot: Partial<TimeSlot>) => void
  existingTimeSlots: TimeSlot[]
}

export function TimeSlotDialog({
  timeSlot,
  open,
  onClose,
  onSave,
  existingTimeSlots,
}: TimeSlotDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: timeSlot?.title || "",
      startTime: timeSlot?.startTime || "",
      endTime: timeSlot?.endTime || "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: timeSlot?.title || "",
        startTime: timeSlot?.startTime || "",
        endTime: timeSlot?.endTime || "",
      })
    }
  }, [open, timeSlot, form])

  const validateTimeSlot = (values: z.infer<typeof formSchema>) => {
    const existingTimeSlot = existingTimeSlots.find(
      (t) => t.title === values.title
    );
    if (existingTimeSlot && existingTimeSlot.id !== timeSlot?.id) {
      return { error: `已经存在第 ${existingTimeSlot.title} 节课，无需重复添加。` };
    }
    return { error: null };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const validation = validateTimeSlot(values);
    if (validation.error) {
      alert(validation.error);
      return;
    }
    onSave(values)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {timeSlot ? "编辑节次" : "添加节次"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>节次标题</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="输入节次标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始时间</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束时间</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
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

