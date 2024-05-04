import { Etat } from "@prisma/client";
import { currentUser } from "./current-user";
import { db } from "./db";
import { getBinomeId } from "./getUsers";

export const getChoix = async () => {
  const user = await currentUser();
  if (!user || !user.id) {
    return null;
  }
  const binomeId = await getBinomeId(user.id);

  if (!binomeId) {
    return null;
  }

  const choix = await db.choisirTheme.findMany({
    where: {
      binomeId,
    },
    select: {
      etat: true,
      theme: {
        select: {
          id: true,
        },
      },
    },
  });
  return choix;
};
export const getChoixEnAttente = async () => {
  const user = await currentUser();
  if (!user || !user.id) {
    return null;
  }
  const binomeId = await getBinomeId(user.id);

  if (!binomeId) {
    return null;
  }

  const choix = await db.choisirTheme.findMany({
    where: {
      binomeId,
      etat: Etat.ATTENTE,
    },
    select: {
      etat: true,
      theme: {
        select: {
          id: true,
        },
      },
    },
  });
  return choix;
};

export const getEncadrant = async () => {
  const user = await currentUser();
  if (!user || !user.id) {
    return null;
  }
  const binomeId = await getBinomeId(user.id);

  if (!binomeId) {
    return null;
  }

  const choix = await db.affectation.findFirst({
    where: {
      idBinome: binomeId,
    },
    select: {
      Binome: {
        select: {
          etudiants: {
            where: {
              NOT: {
                id: user.id,
              },
            },
            select: {
              nom: true,
              prenom: true,
              email: true,
            },
          },
        },
      },
      encadrent: {
        select: {
          nom: true,
          prenom: true,
          email: true,
        },
      },
      Theme: {
        select: {
          nom: true,
        },
      },
    },
  });
  return choix;
};
