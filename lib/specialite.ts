import { currentUser } from "./current-user";
import { db } from "./db";

export const getSpecialites = async () => {
  const user = await currentUser();
  if (!user) return null;
  const specialites = await db.specialite.findMany({
    where: {
      departementId: user.departementId,
    },
    select: {
      nom: true,
    },
  });

  return specialites;
};
