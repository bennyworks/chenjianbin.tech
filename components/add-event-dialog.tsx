import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddEventDialog({
  title,
  open,
  onOpenChange,
  onClick,
  onTitleChange,
}: {
  title: string;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (e: React.FormEvent) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加事项</DialogTitle>
          <DialogDescription>请填写事项详细信息</DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-8 items-center gap-4">
          <label htmlFor="title" className="text-right">
            标题
          </label>
          <Input
            id="title"
            type="text"
            placeholder="事项标题"
            value={title}
            onChange={onTitleChange}
            required
            className="col-span-7 border border-gray-300 rounded-md px-2 py-1"
          ></Input>
        </form>
        <DialogFooter>
          <Button type="button" onClick={onClick}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
