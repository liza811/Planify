import { currentUser } from "./current-user";
import { db } from "./db";

export const getPlanning = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: { departementId: user?.departementId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const planning = await db.soutenance.findMany({
    where: {
      planningId: mostRecentPlanning?.id,
      OR: [
        {
          presidentId: user?.id,
        },
        {
          examinateurs: {
            some: {
              enseignnatId: user?.id,
            },
          },
        },
        {
          Binome: {
            Affectation: {
              encadrantId: user.id,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      date: true,
      heure: true,
      Binome: {
        select: {
          etudiants: {
            select: {
              nom: true,
              prenom: true,
            },
          },
          Affectation: {
            select: {
              Theme: {
                select: {
                  nom: true,
                },
              },
              encadrent: {
                select: {
                  nom: true,
                  prenom: true,
                },
              },
            },
          },
        },
      },
      salle: {
        select: {
          bloc: true,
          numero: true,
        },
      },
      president: {
        select: {
          nom: true,
          prenom: true,
        },
      },
      examinateurs: {
        select: {
          enseignant: {
            select: {
              nom: true,
              prenom: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return planning;
};
