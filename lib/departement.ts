import { currentUser } from "./current-user";
import { db } from "./db";

export const getDepartement = async () => {
  const user = await currentUser();
  const departement = await db.departement.findUnique({
    where: {
      id: user?.departementId,
    },
    select: {
      nom: true,
    },
  });
  return departement;
};
