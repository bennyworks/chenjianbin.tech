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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Schedule } from "../types/schedule"
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
  title: z.string().min(1, { message: "标题不能为空" }),
  startDate: z.string().min(1, { message: "开始日期不能为空" }),
  endDate: z.string().min(1, { message: "结束日期不能为空" }),
  participant: z.string().optional(),
  location: z.string().optional(),
})

interface EditScheduleDialogProps {
  schedule: Schedule
  open: boolean
  onClose: () => void
  onSave: (schedule: Partial<Schedule>) => void
}

const participants = ["张三", "李四", "王五", "赵六"]

export function EditScheduleDialog({
  schedule,
  open,
  onClose,
  onSave,
}: EditScheduleDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      participant: schedule.participant || "",
      location: schedule.location,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: schedule.title,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        participant: schedule.participant || "",
        location: schedule.location,
      })
    }
  }, [open, schedule, form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑课程表</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder="输入课程表标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>参与人</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择参与人" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {participants.map((participant) => (
                        <SelectItem key={participant} value={participant}>
                          {participant}
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地点</FormLabel>
                  <FormControl>
                    <Input placeholder="输入地点" {...field} />
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

