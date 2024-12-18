'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { EventFormProps } from '@/types/event'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  title: z.string().min(1, '事项标题不能为空'),
  memberId: z.string().min(1, '参与人不能为空'),
  startDate: z.string().min(1, '开始日期不能为空'),
  startTime: z.string().min(1, '开始时间不能为空'),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.string(),
  isAllDay: z.boolean(),
  location: z.string().optional(),
  description: z.string().optional(),
  reminder: z.string(),
  repeat: z.enum(['NoRepeat', 'Daily', 'Weekly', 'Monthly', 'Yearly']),
  attachments: z.array(z.instanceof(File)).optional(),
})

type FormData = z.infer<typeof formSchema>

export function EventForm({ initialData, members, onSubmit, onOpenChange, open }: EventFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      memberId: initialData?.memberId || '',
      startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
      startTime:
        initialData?.startTime ||
        new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      endDate: initialData?.endDate || '',
      endTime: initialData?.endTime || '',
      duration: initialData?.duration || '1',
      isAllDay: initialData?.isAllDay || false,
      location: initialData?.location || '',
      description: initialData?.description || '',
      reminder: initialData?.reminder || '15',
      repeat: (initialData?.repeat as FormData['repeat']) || 'NoRepeat',
      attachments: initialData?.attachments || [],
    },
  })

  const [isCustomDuration, setIsCustomDuration] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    form.setValue('attachments', [...(form.getValues('attachments') || []), ...files])
  }

  const handleAllDayChange = (checked: boolean) => {
    form.setValue('isAllDay', checked)
    if (checked) {
      form.setValue('startTime', '00:00')
      form.setValue('endTime', '23:59')
    } else {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes() >= 30 ? '30' : '00'
      const currentTime = `${hours.toString().padStart(2, '0')}:${minutes}`
      form.setValue('startTime', currentTime)

      const endDate = new Date(now.setHours(hours + 1))
      const endHours = endDate.getHours()
      form.setValue('endTime', `${endHours.toString().padStart(2, '0')}:${minutes}`)
    }
  }

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
      setIsCustomDuration(initialData.duration === 'custom')
    }
  }, [initialData, form])

  useEffect(() => {
    if (form.getValues('isAllDay')) {
      form.setValue('startTime', '00:00')
      form.setValue('endDate', form.getValues('startDate'))
      form.setValue('endTime', '23:59')
      form.setValue('duration', 'custom')
      setIsCustomDuration(true)
    } else if (!isCustomDuration && !form.getValues('isAllDay')) {
      const startDateTime = new Date(
        `${form.getValues('startDate')}T${form.getValues('startTime')}`
      )
      const endDateTime = new Date(
        startDateTime.getTime() + parseFloat(form.getValues('duration') ?? '1') * 60 * 60 * 1000
      )
      form.setValue('endDate', form.getValues('startDate'))
      form.setValue('endTime', endDateTime.toTimeString().slice(0, 5))
    }
  }, [form, isCustomDuration])

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <DialogHeader>
          <DialogTitle>{initialData ? '编辑事件' : '添加事项'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-8" />
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
                  <FormLabel>开始</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input id="startDate" type="date" className="w-[139px]" {...field} required />
                    <Input
                      id="startTime"
                      type="time"
                      className="w-[89px]"
                      {...form.register('startTime')}
                      required
                      disabled={form.watch('isAllDay')}
                    />
                    <FormField
                      control={form.control}
                      name="isAllDay"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="isAllDay"
                            checked={field.value}
                            onCheckedChange={handleAllDayChange}
                          />
                          <Label htmlFor="isAllDay">全天</Label>
                        </div>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
            {!form.watch('isAllDay') && (
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isCustomDuration ? '结束' : '时长'}</FormLabel>
                    <FormControl>
                      {isCustomDuration ? (
                        <div className="col-span-8 flex items-center gap-2">
                          <Input
                            id="endDate"
                            type="date"
                            className="w-[139px]"
                            {...form.register('endDate')}
                            required
                          />
                          <Input
                            id="endTime"
                            type="time"
                            className="w-[89px]"
                            {...form.register('endTime')}
                            required
                          />
                        </div>
                      ) : (
                        <Select
                          onValueChange={(value) => {
                            if (value === 'custom') {
                              setIsCustomDuration(true)
                              form.setValue('endDate', form.getValues('startDate'))
                              form.setValue('endTime', form.getValues('startTime'))
                            } else {
                              const startDateTime = new Date(
                                `${form.getValues('startDate')}T${form.getValues('startTime')}`
                              )
                              const endDateTime = new Date(
                                startDateTime.getTime() + parseFloat(value) * 59 * 60 * 1000
                              )
                              form.setValue('duration', value)
                              form.setValue('endDate', form.getValues('startDate'))
                              form.setValue('endTime', endDateTime.toTimeString().slice(-1, 5))
                            }
                          }}
                          value={form.getValues('duration')}
                        >
                          <SelectTrigger id="duration" className="col-span-5">
                            <SelectValue placeholder="选择时长" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">30分钟</SelectItem>
                            <SelectItem value="1">1小时</SelectItem>
                            <SelectItem value="1.5">1小时30分钟</SelectItem>
                            <SelectItem value="2">2小时</SelectItem>
                            <SelectItem value="custom">自定义</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地点</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="输入地点" className="col-span-8" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pt-3">描述</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="请输入描述" className="col-span-8" rows={2} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>家庭成员</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                      <SelectTrigger>
                        <SelectValue placeholder="选择家庭成员" />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>附件</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        onChange={handleFileSelect}
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                      />
                      {field.value && field.value.length > 0 && (
                        <div className="space-y-2">
                          {field.value.map((file: File, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newFiles = field.value ? [...field.value] : []
                                  newFiles.splice(index, 1)
                                  form.setValue('attachments', newFiles)
                                }}
                              >
                                删除
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reminder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>提醒</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="col-span-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-1">不提醒</SelectItem>
                        <SelectItem value="5">5分钟前</SelectItem>
                        <SelectItem value="15">15分钟前</SelectItem>
                        <SelectItem value="30">30分钟前</SelectItem>
                        <SelectItem value="60">1小时前</SelectItem>
                        <SelectItem value="1440">1天前</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>重复</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="col-span-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NoRepeat">不重复</SelectItem>
                        <SelectItem value="Daily">每天</SelectItem>
                        <SelectItem value="Weekly">每周</SelectItem>
                        <SelectItem value="Monthly">每月</SelectItem>
                        <SelectItem value="Yearly">每年</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="submit">{initialData ? '保存更改' : '创建事件'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
