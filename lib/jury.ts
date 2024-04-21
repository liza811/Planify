import { currentUser } from "./current-user";
import { db } from "./db";

export const getJury = async () => {
  const user = await currentUser();

  const binomeWithThemeWithEncadrant = await db.binome.findMany({
    where: {
      etudiants: {
        every: {
          departementId: user?.departementId,
        },
      },
    },
    select: {
      id: true,

      Affectation: {
        select: {
          Theme: {
            select: {
              themeSpecialites: {
                select: {
                  specialite: {
                    select: {
                      nom: true,
                    },
                  },
                },
              },
            },
          },
          encadrent: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  return binomeWithThemeWithEncadrant;
};

export const getEnsWithGrade = async () => {
  const user = await currentUser();

  const ensWithGradeWithSpecialite = await db.enseignant.findMany({
    where: {
      departementId: user?.departementId,
    },
    select: {
      id: true,
      grade: true,
      specialite: {
        select: {
          nom: true,
        },
      },
    },
  });
  return ensWithGradeWithSpecialite;
};
