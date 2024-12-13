'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MemberCard } from '@/components/member-card'
import { MemberForm } from '@/components/member-form'
import { FamilyMember, FamilyMemberFormData } from '@/types/family'

interface FamilyListProps {
  initialMembers?: FamilyMember[]
  onAdd?: (member: FamilyMemberFormData) => void
  onEdit?: (id: string, member: FamilyMemberFormData) => void
  onDelete?: (id: string) => void
}

export function FamilyList({ initialMembers = [], onAdd, onEdit, onDelete }: FamilyListProps) {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers)
  const [formOpen, setFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<FamilyMember | undefined>()

  const handleAdd = (data: FamilyMemberFormData) => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
    }
    setMembers([...members, newMember])
    setFormOpen(false)
    onAdd?.(data)
  }

  const handleEdit = (data: FamilyMemberFormData) => {
    if (!editingMember) return
    const updatedMembers = members.map((member) =>
      member.id === editingMember.id ? { ...member, ...data } : member
    )
    setMembers(updatedMembers)
    setEditingMember(undefined)
    onEdit?.(editingMember.id, data)
  }

  const handleDelete = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
    onDelete?.(id)
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
