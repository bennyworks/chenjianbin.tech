import * as React from "react";

import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";

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

export function EventList({ events }: { events: EventApi[] }) {
  return (
    <>
      <div className="text-center text-md font-heading mb-4">事项列表</div>
      <ul className="space-y-2 h-[56vh] overflow-y-auto">
        {events.length <= 0 && (
          <div className="mt-8 text-sm italic text-center text-gray-500">
            空空如也
          </div>
        )}
        {events.length > 0 &&
          events.map((event: EventApi) => (
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
    </>
  );
}
