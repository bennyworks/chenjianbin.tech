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
import { Course } from "../types/schedule"
import { DeleteCourseDialog } from "./delete-course-dialog"

interface CourseMenuProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (course: Course) => void
}

export function CourseMenu({ course, onEdit, onDelete }: CourseMenuProps) {
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
          <DropdownMenuItem onClick={() => onEdit(course)}>
            编辑课程
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDeleteDialogOpen(true)}
            className="text-destructive"
          >
            删除课程
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCourseDialog
        course={course}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(course)
          setDeleteDialogOpen(false)
        }}
      />
    </>
  )
}

