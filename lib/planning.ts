import { Session, Visibility } from "@prisma/client";
import { currentUser } from "./current-user";
import { db } from "./db";

export const getPlanningPersonnel = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: {
      AND: [
        { departementId: user?.departementId },
        { etat: Visibility.VISIBLE },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentPlanning) {
    return null;
  }
  const planning = await db.soutenance.findMany({
    where: {
      planningId: mostRecentPlanning.id,
      session: Session.NORMAL,
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
export const getPlanningPersonnelRattrapage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: {
      AND: [
        { departementId: user?.departementId },
        { etat: Visibility.VISIBLE },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentPlanning) {
    return null;
  }
  const planning = await db.soutenance.findMany({
    where: {
      planningId: mostRecentPlanning.id,
      session: Session.RATTRAPAGE,
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
export const getPlanning = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: {
      AND: [
        { departementId: user?.departementId },
        { etat: Visibility.VISIBLE },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentPlanning) {
    return null;
  }

  const planning = await db.soutenance.findMany({
    where: {
      planningId: mostRecentPlanning.id,
      session: Session.NORMAL,
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
export const getPlanningRecord = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: {
      AND: [
        { departementId: user?.departementId },
        { etat: Visibility.VISIBLE },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentPlanning) {
    return null;
  }
  const recordCount = await db.soutenance.count({
    where: {
      planningId: mostRecentPlanning.id,
      session: Session.RATTRAPAGE,
    },
  });

  return recordCount;
};
export const getPlanningRattrapage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const mostRecentPlanning = await db.planning.findFirst({
    where: {
      AND: [
        { departementId: user?.departementId },
        { etat: Visibility.VISIBLE },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentPlanning) {
    return null;
  }
  const planning = await db.soutenance.findMany({
    where: {
      planningId: mostRecentPlanning.id,
      session: Session.RATTRAPAGE,
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
