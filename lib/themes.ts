import { Etat } from "@prisma/client";
import { currentUser } from "./current-user";
import { db } from "./db";
import { specialiteBinome } from "./getUsers";
import { getaffectationIds } from "./affectation";

export const getThemes = async () => {
  const user = await currentUser();

  if (!user) return;
  const themes = await db.theme.findMany({
    where: {
      proposerId: user.id,
    },

    select: {
      id: true,
      nom: true,
      createdAt: true,
      themeSpecialites: {
        include: {
          specialite: {
            select: {
              nom: true,
            },
          },
        },
      },
    },
  });
  return themes;
};

export const getMesThemsChoisi = async () => {
  const user = await currentUser();
  const affectations = await getaffectationIds();

  const themes = await db.theme.findMany({
    distinct: "id",

    where: {
      proposerId: user?.id,
      ChoisirTheme: {
        some: {},
      },
    },

    select: {
      id: true,
      nom: true,

      ChoisirTheme: {
        where: {
          etat: {
            in: [Etat.ATTENTE, Etat.VALIDE],
          },
          binomeId: {
            notIn: affectations.map((a) => a.idBinome),
          },
        },

        include: {
          binome: {
            include: {
              etudiants: {
                select: {
                  nom: true,
                  prenom: true,
                  specialite: { select: { nom: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return themes;
};

export const getThemesParSpecialite = async () => {
  const user = await currentUser();

  if (!user) return;

  const specialites = await specialiteBinome();
  if (!specialites) return null;
  const validThemeIds = await db.choisirTheme.findMany({
    where: { etat: Etat.VALIDE },
    select: { id: true },
  });

  const validThemeIdArray = validThemeIds.map((theme) => theme.id);

  const themes = await db.theme.findMany({
    where: {
      AND: [
        {
          themeSpecialites: {
            some: {
              specialite: {
                nom: {
                  in: specialites.etudiants.map(
                    (e) => e.specialite?.nom as string
                  ),
                },
              },
            },
          },
        },
        {
          id: {
            notIn: validThemeIdArray,
          },
        },
      ],
    },
    include: {
      themeSpecialites: {
        include: { specialite: { select: { nom: true } } },
      },

      proposePar: {
        select: {
          nom: true,
          prenom: true,
          email: true,
        },
      },
    },
  });

  return themes;
};

export const getThemesParSpecialiteNonChoisi = async () => {
  const user = await currentUser();

  if (!user) return;

  const specialites = await specialiteBinome();
  if (!specialites) return null;
  const validThemeIds = await db.affectation.findMany({
    where: {
      Binome: {
        etudiants: {
          some: {
            departementId: user.departementId,
          },
        },
      },
    },
    select: { themeId: true },
  });

  const validThemeIdArray = validThemeIds.map((theme) => theme.themeId);

  const themes = await db.theme.findMany({
    where: {
      AND: [
        {
          themeSpecialites: {
            some: {
              specialite: {
                departementId: user.departementId,
                nom: {
                  in: specialites.etudiants.map(
                    (e) => e.specialite?.nom as string
                  ),
                },
              },
            },
          },
        },
        {
          id: {
            notIn: validThemeIdArray,
          },
        },
      ],
    },
    include: {
      themeSpecialites: {
        include: { specialite: { select: { nom: true } } },
      },

      proposePar: {
        select: {
          nom: true,
          prenom: true,
          email: true,
        },
      },
    },
  });

  return themes;
};
