import { db } from "./db";

export const getSalles = async (departementId: string | undefined) => {
  if (departementId) {
    const salles = await db.salle.findMany({
      where: {
        departementId: departementId,
      },
      select: {
        bloc: true,
        numero: true,
        id: true,
      },
    });

    return salles;
  }
  return null;
};
