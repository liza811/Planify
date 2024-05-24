"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const markAllSeen = async () => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  await db.notification.updateMany({
    where: {
      toId: user.id,
    },
    data: {
      seen: true,
    },
  });

  return { success: "true" };
};
