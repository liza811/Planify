import { currentUser } from "./current-user";
import { db } from "./db";

export const getSalles = async () => {
  const user = await currentUser();

  const salles = await db.salle.findMany({
    where: {
      departementId: user?.departementId,
    },
    select: {
      id: true,
      indisponibilite: true,
    },
  });
  return salles;
};
