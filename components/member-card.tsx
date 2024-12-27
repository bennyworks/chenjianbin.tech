import { Ellipsis, Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Member } from '@/types/family'
import { getSolarToLunar } from '@/lib/utils'

interface MemberCardProps {
  member: Member
  onEdit: (member: Member) => void
  onDelete: (id: string) => void
}

export function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const formattedDate = new Date(member.birthday).toLocaleDateString('zh-CN')
  const lunarDate = getSolarToLunar(member.birthday)

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="bg-primary size-8">
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{member.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(member)}>
              <Edit className="mr-2 h-4 w-4" />
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(member.id)}>
              <Trash className="mr-2 h-4 w-4" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start pr-2">
          <div className="space-y-1">
            <div className="text-sm">
              <span className="text-muted-foreground">生日：</span>
              {formattedDate}
            </div>
            <div className="text-sm text-muted-foreground pl-[3em]">{lunarDate}</div>
          </div>
          <div className="text-sm text-right">
            <span className="text-muted-foreground">阶段：</span>
            {member.lifeStage === 'PrimaryStudent' && '小学'}
            {member.lifeStage === 'JuniorStudent' && '初中'}
            {member.lifeStage === 'SeniorStudent' && '高中'}
            {member.lifeStage === 'Parent' && '父母'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
