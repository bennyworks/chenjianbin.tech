"use client";

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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";

function getCurrentDateTime() {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].slice(0, 5);
  return { date, time };
}

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
  const [currentDateTime, setCurrentDateTime] = React.useState(
    getCurrentDateTime()
  );
  const [isAllDay, setIsAllDay] = React.useState(false);
  const [duration, setDuration] = React.useState("1");
  const [startDate, setStartDate] = React.useState(currentDateTime.date);
  const [startTime, setStartTime] = React.useState(currentDateTime.time);
  const [endDate, setEndDate] = React.useState(currentDateTime.date);
  const [endTime, setEndTime] = React.useState(currentDateTime.time);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  React.useEffect(() => {
    setStartDate(currentDateTime.date);
    setStartTime(currentDateTime.time);
    setEndDate(currentDateTime.date);
    setEndTime(currentDateTime.time);
  }, [currentDateTime]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新日程</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              标题
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              placeholder="事项标题"
              className="col-span-7"
              onChange={onTitleChange}
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">
              开始
            </Label>
            <div className="col-span-7 flex items-center gap-2">
              <Input
                id="start-date"
                type="date"
                className="w-[140px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                id="start-time"
                type="time"
                className="w-[90px]"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="allDay"
                  checked={isAllDay}
                  onCheckedChange={(checked) => setIsAllDay(checked as boolean)}
                />
                <Label htmlFor="allDay">全天</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              {duration === "custom" ? "结束" : "时长"}
            </Label>
            <div className="col-span-4">
              {duration === "custom" ? (
                <div className="flex gap-2">
                  <Input
                    id="end-date"
                    type="date"
                    className="w-[140px]"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <Input
                    id="end-time"
                    type="time"
                    className="w-[90px]"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              ) : (
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="选择时长" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">30分钟</SelectItem>
                    <SelectItem value="1">1小时</SelectItem>
                    <SelectItem value="1.5">1小时30分钟</SelectItem>
                    <SelectItem value="2">2小时</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              地点
            </Label>
            <Input
              id="location"
              placeholder="添加地点"
              className="col-span-7"
            />
          </div>

          {/* Attachments */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-right">附件</Label>
            <div className="col-span-2">
              <Button variant="outline" className="w-full justify-center">
                <Upload className="mr-2" /> 添加附件
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-8 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              描述
            </Label>
            <Textarea
              id="description"
              placeholder="请输入描述"
              className="col-span-7"
              rows={3}
            />
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="calendar" className="text-right">
              日历
            </Label>
            <Select defaultValue="default">
              <SelectTrigger id="calendar" className="col-span-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">个人的日历</SelectItem>
                <SelectItem value="work">Ben的日历</SelectItem>
                <SelectItem value="personal">Sherry的日历</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reminder */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="reminder" className="text-right">
              提醒
            </Label>
            <Select defaultValue="15">
              <SelectTrigger id="reminder" className="col-span-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">不提醒</SelectItem>
                <SelectItem value="5">5分钟前</SelectItem>
                <SelectItem value="15">15分钟前</SelectItem>
                <SelectItem value="30">30分钟前</SelectItem>
                <SelectItem value="60">1小时前</SelectItem>
                <SelectItem value="1440">1天前</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Repeat */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="repeat" className="text-right">
              重复
            </Label>
            <Select defaultValue="none">
              <SelectTrigger id="repeat" className="col-span-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">不重复</SelectItem>
                <SelectItem value="daily">每天</SelectItem>
                <SelectItem value="weekly">每周</SelectItem>
                <SelectItem value="monthly">每月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="button" onClick={onClick}>
            保存日程
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
