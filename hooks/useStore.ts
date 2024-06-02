import { Notification } from "@prisma/client";
import state from "pusher-js/types/src/core/http/state";
import { create } from "zustand";

// interface Notification {
//   id: string;
//   content: string;
//   date: Date;
//   seen: boolean;
//   toId: string;
//   type: string;
// }

interface NotificationState {
  neww: boolean;
  setNew: (message: boolean) => void;

  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAllSeen: () => void;
  markSeen: (notificationId: string) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  neww: false,
  setNew: (message: boolean) => set({ neww: message }),
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  markAllSeen: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        seen: true,
      })),
    })),
  markSeen: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, seen: true }
          : notification
      ),
    })),
}));

export default useNotificationStore;
