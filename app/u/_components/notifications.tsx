"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useNotificationStore from "@/hooks/useStore";
import { Notification, NotificationType } from "@prisma/client";

import { Bell, Search, X } from "lucide-react";

interface notificationsProps {
  mesNotifications: Notification[] | null;
}

export const Notifications = ({ mesNotifications }: notificationsProps) => {
  const { notifications, neww, setNew } = useNotificationStore();
  let seen = hasUnseenNotification(mesNotifications);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const onClick = () => {
    setNew(false);
    seen === false;

    markAllSeen().then((data) => {
      if (data.success) {
        setNew(false);
        seen = false;
      }
    });
  };
  if (!mounted) return null;

  return (
    <Popover>
      <PopoverTrigger onClick={onClick}>
        <div className="relative flex flex-row-reverse">
          <Bell size={27} className="text-primary_purpule " />
          {neww && (
            <span className="rounded-full  bg-red-500 size-3 z-50 absolute border-[3px] border-white -top-1 " />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-5 flex flex-col w-[350px] bg-[#f8f7ff] p-0 pb-2 ">
        <h2 className="font-bold  border-b p-2 py-4  flex justify-between items-center w-full">
          {"Notifications"}
          <span className="">
            <X className="font-extrabold cursor-pointer size-4" />
          </span>
        </h2>
        <ScrollArea className=" gap-y-1 w-full h-[60vh]   ">
          <div className="flex flex-col gap-y-4  h-full px-2 mt-2">
            {notifications.length === 0 && !mesNotifications?.length && (
              <div className="flex items-center justify-center capitalize gap-x-2 h-full pt-10">
                <Search size={21} className="text-slate-700" />
                aucune notifications.
              </div>
            )}
            {notifications.length > 0 && (
              <>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex w-full  gap-x-2 bg-white rounded-md b relative "
                  >
<<<<<<< HEAD
                    <div className="bg-primary_purpule w-[4px] h-full  overflow-hidden rounded-md absolute left-0 top-0" />
=======
                    <div className="bg-primary_purpule w-[4px] h-full  overflow-hidden rounded-l-md absolute mr-2" />
>>>>>>> 0ab8adc7358cb240dd1f48cbb3e02a38645260c5
                    <div className="bg-neutral-100    rounded-full flex justify-center items-center p-2 h-fit mt-4">
                      <Bell size={17} className="text-primary_blue " />
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2 py-3">
                      <h2 className="text-black font-semibold ">
                        {notification.type === NotificationType.B_TO_B
                          ? "Modifications de choix"
                          : ""}
                      </h2>
                      <p className="text-sm ">{notification.content}</p>
                      <span className="text-muted-foreground w-fit text-xs">
                        {getTimeSinceNotification(notification.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {!!mesNotifications &&
              mesNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex w-full  gap-x-2 bg-white rounded-md border- relative"
                >
                  <div className="bg-primary_purpule w-[4px] h-full  overflow-hidden rounded-l-md absolute mr-2" />
                  <div className="bg-neutral-100    rounded-full flex justify-center items-center p-2 h-fit mt-4 ml-4">
                    <Bell size={17} className="text-blue-600 " />
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2 py-3">
                    <h2 className="text-black font-semibold ">
                      {notification.type === NotificationType.B_TO_B
                        ? "Modifications de choix"
                        : ""}
                    </h2>
                    <p className="text-sm ">{notification.content}</p>
                    <span className="text-muted-foreground w-fit text-xs">
                      {getTimeSinceNotification(notification.date)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

import { differenceInMinutes, differenceInHours, format } from "date-fns";
import { markAllSeen } from "@/actions/notifications";
export function getTimeSinceNotification(notificationDate: Date): string {
  const now = new Date();
  const minutesDiff = differenceInMinutes(now, notificationDate);

  if (minutesDiff < 60) {
    return `${
      minutesDiff <= 1
        ? `${minutesDiff} minute ago`
        : `${minutesDiff} minutes ago`
    } `;
  } else {
    const hoursDiff = differenceInHours(now, notificationDate);

    if (hoursDiff < 24) {
      return `${
        hoursDiff === 1 ? `${hoursDiff} hour ago` : `${hoursDiff} hours ago`
      } `;
    } else {
      return format(notificationDate, "dd MMM yyyy, HH:mm");
    }
  }
}

function hasUnseenNotification(
  mesNotifications: Notification[] | null
): boolean {
  if (!mesNotifications) {
    return true;
  }

  return mesNotifications.some((notification) => notification.seen === false);
}
