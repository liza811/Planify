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
import { pusherClient } from "@/lib/pusher";

interface notificationsProps {
  mesNotifications: Notification[] | null;
}
export const Notifications = ({ mesNotifications }: notificationsProps) => {
  const { notifications, neww, setNew, addNotification } =
    useNotificationStore();

  const [seen, setSeen] = useState<boolean>(true);

  const user = useCurrentUser();
  const [seenPlanningNotif, setSeenPlanningNotif] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [adminN, setAdminN] = useState<string>(
    mesNotifications?.filter(
      (n) => n.type === NotificationType.ADMIN_TO_USERS
    )[0]?.id || ""
  );
  const [open, setOpen] = useState(false);

  const binomeId: string = user?.id!;
  useEffect(() => {
    // setAdminN(
    //   mesNotifications?.filter(
    //     (n) => n.type === NotificationType.ADMIN_TO_USERS
    //   )[0].id || ""
    // );

    const notificationSeen = localStorage.getItem("planningNotificationSeen");
    const lastNotifId = localStorage.getItem("LastNotificationId");
    setSeenPlanningNotif(
      (notificationSeen === "true" && lastNotifId == adminN) ||
        notificationSeen === null
        ? true
        : false
    );

    setMounted(true);
    setSeen(hasUnseenNotification(mesNotifications));
    const handleMessage = (data: Notification) => {
      addNotification(data);
      setNew(true);
      if (data.type === NotificationType.ADMIN_TO_USERS) {
        localStorage.setItem("planningNotificationSeen", "false");
        localStorage.setItem("LastNotificationId", data.id);
        setAdminN(data.id);
      }
    };

    if (user?.id) {
      pusherClient.subscribe(user.id);
      pusherClient.bind("valider", handleMessage);
    }

    if (binomeId) {
      pusherClient.subscribe(binomeId);
      pusherClient.bind("choix", handleMessage);
    }
    if (user?.departementId) {
      pusherClient.subscribe(user?.departementId);
      pusherClient.bind("planning", handleMessage);
    }
    // Cleanup
    return () => {
      if (user?.id) {
        pusherClient.unbind("valider", handleMessage);
        pusherClient.unsubscribe(user.id);
      }
      if (binomeId) {
        pusherClient.unbind("choix", handleMessage);
        pusherClient.unsubscribe(binomeId);
      }
      if (user?.departementId) {
        pusherClient.unbind("planning", handleMessage);
        pusherClient.unsubscribe(user?.departementId);
      }
    };
  }, [
    addNotification,
    adminN,
    binomeId,
    mesNotifications,
    seenPlanningNotif,
    setNew,
    user?.departementId,
    user?.id,
  ]);

  const onClick = () => {
    setNew(false);
    setSeen(true);

    localStorage.setItem("LastNotificationId", adminN);

    localStorage.setItem("planningNotificationSeen", "true");
    setSeenPlanningNotif(true);
    markAllSeen().then((data) => {
      if (data.success) {
        setNew(false);
        setSeen(true);
      }
    });
  };
  if (!mounted) return null;
  const onClose = () => {
    setOpen((open) => !open);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="relative flex flex-row-reverse">
          <Bell size={27} className="text-primary_purpule " onClick={onClick} />
          {(neww === true || seen === false || seenPlanningNotif === false) && (
            <span className="rounded-full  bg-red-500 size-3 z-50 absolute border-[3px] border-white -top-1 " />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className=" mr-3 md:mr-5 flex flex-col w-[340px] md:w-[350px] bg-[#f8f7ff] p-0 pb-2 ">
        <h2 className="font-bold  border-b p-2 py-4  flex justify-between items-center w-full">
          {"Notifications"}
          <span className="">
            <X
              className="font-extrabold cursor-pointer size-4"
              onClick={onClose}
            />
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
                    <div className="bg-primary_purpule w-[4px] h-full  overflow-hidden rounded-md absolute left-0 top-0" />
                    <div className="bg-neutral-100    rounded-full flex justify-center items-center p-2 h-fit mt-4  ml-4">
                      <Bell size={17} className="text-primary_purpule " />
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2 py-3">
                      <h2 className="text-black font-semibold text-sm ">
                        {notification.type === NotificationType.B_TO_B
                          ? "Modifications de choix"
                          : ""}
                        {notification.type === NotificationType.E_TO_B
                          ? "Validation de choix"
                          : ""}
                        {notification.type === NotificationType.ADMIN_TO_USERS
                          ? "Planning des soutenances"
                          : ""}
                      </h2>
                      <p className="text-xs ">{notification.content}</p>
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
                    <Bell size={17} className="text-primary_purpule " />
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2 py-3">
                    <h2 className="text-black font-semibold text-sm ">
                      {notification.type === NotificationType.B_TO_B
                        ? "Modifications de choix"
                        : ""}
                      {notification.type === NotificationType.E_TO_B
                        ? "Validation de choix"
                        : ""}
                      {notification.type === NotificationType.ADMIN_TO_USERS
                        ? "Planning des soutenances"
                        : ""}
                    </h2>
                    <p className="text-xs ">{notification.content}</p>
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
import { useCurrentUser } from "@/hooks/use-current-user";
export function getTimeSinceNotification(notificationDate: Date): string {
  const now = new Date();
  const minutesDiff = differenceInMinutes(now, notificationDate);

  if (minutesDiff < 60) {
    return `${
      minutesDiff <= 1
        ? `Il y a ${minutesDiff} minute `
        : `Il y a ${minutesDiff} minutes `
    } `;
  } else {
    const hoursDiff = differenceInHours(now, notificationDate);

    if (hoursDiff < 24) {
      return `${
        hoursDiff === 1
          ? `Il y a ${hoursDiff} heure `
          : `Il y a ${hoursDiff} heures `
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

  if (
    mesNotifications.some(
      (notification) =>
        notification.seen === false &&
        notification.type !== NotificationType.ADMIN_TO_USERS
    )
  ) {
    return false;
  }

  return true;
}
