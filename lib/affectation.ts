import { currentUser } from "./current-user";
import { db } from "./db";

export const getaffectationIds = async () => {
  const user = await currentUser();

  const affectations = await db.affectation.findMany({
    where: {
      Binome: {
        etudiants: {
          some: {
            departementId: user?.departementId,
          },
        },
      },
    },
    select: {
      idBinome: true,
    },
  });
  return affectations;
};

export const getaffectations = async () => {
  const user = await currentUser();

  const affectations = await db.affectation.findMany({
    where: {
      encadrantId: user?.id,
      encadrent: {
        departementId: user?.departementId,
      },
    },
    select: {
      etat: true,
      Theme: {
        select: {
          id: true,
          nom: true,
        },
      },
      Binome: {
        select: {
          id: true,
          etudiants: {
            select: {
              nom: true,
              prenom: true,
              email: true,
              specialite: { select: { nom: true } },
            },
          },
        },
      },
    },
  });
  return affectations;
};
