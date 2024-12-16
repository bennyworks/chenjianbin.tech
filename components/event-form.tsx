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
import { Upload } from 'lucide-react'
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
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.string(),
  isAllDay: z.boolean(),
  location: z.string(),
  description: z.string(),
  calendar: z.string(),
  reminder: z.string(),
  repeat: z.enum(['NoRepeat', 'Daily', 'Weekly', 'Monthly', 'Yearly']),
  attachments: z.array(z.instanceof(File)),
})

type FormData = z.infer<typeof formSchema>

export function EventForm({ initialData, members, onSubmit, onOpenChange, open }: EventFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      memberId: initialData?.memberId || '',
      startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
      startTime: initialData?.startTime || '13:00',
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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    form.setValue('attachments', [...(form.getValues('attachments') || []), ...files])
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
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? '编辑事件' : '新建事项'}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input {...field} className="col-span-7" />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage>{form.formState.errors.title.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>开始</FormLabel>
                    <FormControl>
                      <div className="col-span-7 flex items-center gap-2">
                        <Input
                          id="startDate"
                          type="date"
                          className="w-[140px]"
                          {...field}
                          required
                        />
                        <Input
                          id="startTime"
                          type="time"
                          className="w-[90px]"
                          {...form.register('startTime')}
                          required
                          disabled={form.getValues('isAllDay')}
                        />
                        <div className="flex items-center gap-2">
                          <Checkbox id="isAllDay" {...form.register('isAllDay')} />
                          <Label htmlFor="isAllDay">全天</Label>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {!form.getValues('isAllDay') && (
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isCustomDuration ? '结束' : '时长'}</FormLabel>
                      <FormControl>
                        {isCustomDuration ? (
                          <div className="col-span-7 flex items-center gap-2">
                            <Input
                              id="endDate"
                              type="date"
                              className="w-[140px]"
                              {...form.register('endDate')}
                              required
                            />
                            <Input
                              id="endTime"
                              type="time"
                              className="w-[90px]"
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
                                  startDateTime.getTime() + parseFloat(value) * 60 * 60 * 1000
                                )
                                form.setValue('duration', value)
                                form.setValue('endDate', form.getValues('startDate'))
                                form.setValue('endTime', endDateTime.toTimeString().slice(0, 5))
                              }
                            }}
                            value={form.getValues('duration')}
                          >
                            <SelectTrigger id="duration" className="col-span-4">
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
                      <Input
                        id="location"
                        {...field}
                        placeholder="输入地点"
                        className="col-span-7"
                      />
                    </FormControl>
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
                      <Button
                        type="button"
                        variant="outline"
                        className="w-1/3 justify-center"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2" /> 添加附件
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                        multiple
                      />
                      {form.getValues('attachments') &&
                        form.getValues('attachments').length > 0 && (
                          <p className="text-sm text-muted-foreground mt-2">
                            已选择 {form.getValues('attachments').length} 个文件
                          </p>
                        )}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pt-2">描述</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        {...field}
                        placeholder="请输入描述"
                        className="col-span-7"
                        rows={3}
                      />
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
                      <Select
                        onValueChange={(value) => form.setValue('memberId', value)}
                        value={form.getValues('memberId')}
                        required
                      >
                        <SelectTrigger id="participant">
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
                      {form.formState.errors.memberId && (
                        <FormMessage>{form.formState.errors.memberId.message}</FormMessage>
                      )}
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
                      <Select
                        onValueChange={(value) => form.setValue('reminder', value)}
                        value={form.getValues('reminder')}
                      >
                        <SelectTrigger id="reminder" className="col-span-7">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">不提醒</SelectItem>
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
                      <Select
                        onValueChange={(value: FormData['repeat']) =>
                          form.setValue('repeat', value)
                        }
                        value={form.getValues('repeat')}
                      >
                        <SelectTrigger id="repeat" className="col-span-7">
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
                <Button type="button" variant="outline">
                  取消
                </Button>
                <Button type="submit">{initialData ? '保存更改' : '创建事件'}</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
