'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TimeSlot } from '@/types/schedule'

interface DeleteTimeSlotDialogProps {
  timeSlot: TimeSlot
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteTimeSlotDialog({
  timeSlot,
  open,
  onClose,
  onConfirm,
}: DeleteTimeSlotDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>删除节次</DialogTitle>
          <DialogDescription>
            确定要删除第 {timeSlot.title} 节课吗？此操作不可撤销，并且会同时删除该节次下的所有课程。
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
