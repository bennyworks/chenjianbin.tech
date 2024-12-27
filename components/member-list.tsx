'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MemberCard } from '@/components/member-card'
import { MemberForm } from '@/components/member-form'
import { Member, MemberFormData } from '@/types/family'

interface MemberListProps {
  initialMembers?: Member[]
  onAddMember: (member: MemberFormData) => void
  onEditMember: (id: string, member: MemberFormData) => void
  onDeleteMember: (id: string) => void
}

export function MemberList({
  initialMembers = [],
  onAddMember,
  onEditMember,
  onDeleteMember,
}: MemberListProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [formOpen, setFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | undefined>()

  console.log('members', members)

  const handleAdd = (data: MemberFormData) => {
    const newMember: Member = {
      id: Math.random().toString(36),
      ...data,
    }
    setMembers([...members, newMember])
    setFormOpen(false)
    onAddMember(data)
  }

  const handleEdit = (data: MemberFormData) => {
    if (!editingMember) return
    const updatedMembers = members.map((member) =>
      member.id === editingMember.id ? { ...member, ...data } : member
    )
    setMembers(updatedMembers)
    setEditingMember(undefined)
    onEditMember(editingMember.id, data)
  }

  const handleDelete = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
    onDeleteMember(id)
  }

  return (
    <div className="space-y-4 p-4">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onEdit={(member) => setEditingMember(member)}
          onDelete={handleDelete}
        />
      ))}

      <Button className="w-full" onClick={() => setFormOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        添加成员
      </Button>

      <MemberForm
        open={formOpen || !!editingMember}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingMember(undefined)
        }}
        onSubmit={editingMember ? handleEdit : handleAdd}
        initialData={editingMember}
      />
    </div>
  )
}
