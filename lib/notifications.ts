import { currentUser } from "./current-user";
import { db } from "./db";

export const getNotificationsByUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  const notifications = await db.notification.findMany({
    where: {
      toId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });
  return notifications;
};
