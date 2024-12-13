import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FamilyMember, FamilyMemberFormData } from '@/types/family'

const formSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  type: z.enum(['Parent', 'Child'], {
    required_error: '请选择成员类型',
  }),
  birthday: z.string()
    .min(1, '请选择生日')
    .transform((date) => {
      // Convert the date to ISO format with time and timezone
      return new Date(date).toISOString();
    }),
  lifeStage: z.enum(['PrimaryStudent', 'JuniorStudent', 'SeniorStudent', 'Parent'], {
    required_error: '请选择生活阶段',
  }),
})

interface MemberFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FamilyMemberFormData) => void
  initialData?: FamilyMember
}

export function MemberForm({ open, onOpenChange, onSubmit, initialData }: MemberFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      type: 'Child',
      birthday: '',
      lifeStage: 'PrimaryStudent',
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? '编辑成员' : '添加成员'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>成员类型</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择成员类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Parent">父母</SelectItem>
                      <SelectItem value="Child">孩子</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>生日</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lifeStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>阶段</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择生活阶段" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PrimaryStudent">小学</SelectItem>
                      <SelectItem value="JuniorStudent">初中</SelectItem>
                      <SelectItem value="SeniorStudent">高中</SelectItem>
                      <SelectItem value="Parent">父母</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {initialData ? '保存' : '添加'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
