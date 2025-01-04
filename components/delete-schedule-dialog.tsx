'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Schedule } from "../types/schedule"

interface DeleteScheduleDialogProps {
  schedule: Schedule
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteScheduleDialog({
  schedule,
  open,
  onClose,
  onConfirm,
}: DeleteScheduleDialogProps) {
  const [confirmText, setConfirmText] = useState("")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>删除课程表</DialogTitle>
          <DialogDescription>
            此操作不可撤销。请输入课程表名称 "{schedule.title}" 以确认删除。
          </DialogDescription>
        </DialogHeader>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="输入课程表名称"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmText !== schedule.title}
          >
            删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

