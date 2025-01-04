'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Course } from "../types/schedule"

interface DeleteCourseDialogProps {
  course: Course
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteCourseDialog({
  course,
  open,
  onClose,
  onConfirm,
}: DeleteCourseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>删除课程</DialogTitle>
          <DialogDescription>
            确定要删除课程 "{course.title}" 吗？此操作不可撤销。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

