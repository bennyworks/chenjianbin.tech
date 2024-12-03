"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/locales/zh-cn";

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
import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FamilyCalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FamilyCalendar({ className, ...props }: FamilyCalendarProps) {
  const [currentEvents, setCurrentEvents] = React.useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<DateSelectArg | null>(
    null
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saveedEvents = JSON.parse(localStorage.getItem("events") || "[]");
      if (saveedEvents) {
        setCurrentEvents(saveedEvents);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate?.start,
        end: selectedDate?.end,
        allDay: selectedDate?.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  return (
    <div className={cn("h-full", className)} {...props}>
      <div className="flex w-full justify-start items-start divide-x divide-gray-300">
        <div className="w-3/12 px-2">
          <div className="text-left text-lg font-extra-bold mb-4">事项列表</div>
          <ul className="space-y-2 max-h-[55vh] overflow-y-auto">
            {currentEvents.length <= 0 && (
              <div className="mt-8 text-sm italic text-center text-gray-500">
                空空如也
              </div>
            )}
            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  className="border border-gray-200 shadow rounded-lg px-2 py-2 text-gray-600"
                  key={event.id}
                >
                  <div className="flex justify-between items-center">
                    <div className="w-full items-center justify-between sm:px-2">
                      <div className="space-x-2 rtl:space-x-reverse">
                        <span className="text-emphasis truncate font-medium">
                          {event.title}
                        </span>
                      </div>
                      <p className="text-subtle text-sm mt-1">
                        {formatDate(event.start!, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          locale: "zh-CN",
                        })}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Trash />
                            <span>删除</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="w-9/12 px-2">
          <FullCalendar
            locale={"zh-CN"}
            height={"60vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: "今天",
              month: "月",
              week: "周",
              day: "日",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
          ></FullCalendar>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="col-span-7 border border-gray-300 rounded-md px-2 py-1"
            ></Input>
          </form>
          <DialogFooter>
            <Button type="button" onClick={handleAddEvent}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
