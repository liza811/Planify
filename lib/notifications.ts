import { currentUser } from "./current-user";
import { db } from "./db";

export const getNotificationsByUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  const notifications = await db.notification.findMany({
    where: {
      OR: [{ toId: user.id }, { fromId: user.departementId }],
    },
    orderBy: {
      date: "desc",
    },
  });
  return notifications;
};
