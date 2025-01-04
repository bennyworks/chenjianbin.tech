'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TimeSlot } from "../types/schedule"
import { DeleteTimeSlotDialog } from "./delete-time-slot-dialog"

interface TimeSlotMenuProps {
  timeSlot: TimeSlot
  onEdit: (timeSlot: TimeSlot) => void
  onDelete: (timeSlot: TimeSlot) => void
}

export function TimeSlotMenu({ timeSlot, onEdit, onDelete }: TimeSlotMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(timeSlot)}>
            编辑节次
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDeleteDialogOpen(true)}
            className="text-destructive"
          >
            删除节次
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteTimeSlotDialog
        timeSlot={timeSlot}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(timeSlot)
          setDeleteDialogOpen(false)
        }}
      />
    </>
  )
}

