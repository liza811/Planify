import { currentUser } from "./current-user";
import { db } from "./db";

export const getEnseignants = async (departementId: string | undefined) => {
  const enseignants = await db.enseignant.findMany({
    where: {
      departementId: departementId,
    },
    select: {
      nom: true,
      prenom: true,
      email: true,
      matricule: true,
      specialite: {
        select: { nom: true },
      },
      grade: true,
      id: false,
    },
  });

  return enseignants;
};

export const getEtudiants = async (departementId: string | undefined) => {
  const etudiants = await db.etudiant.findMany({
    where: {
      departementId: departementId,
    },
    select: {
      nom: true,
      prenom: true,
      email: true,
      matricule: true,

      specialite: {
        select: { nom: true },
      },
    },
  });

  return etudiants;
};
export const getBinomeId = async (
  userId: string
): Promise<string | undefined> => {
  const etudiant = await db.etudiant.findUnique({
    where: {
      id: userId,
    },
    select: {
      idBinome: true,
    },
  });

  return etudiant?.idBinome ?? undefined;
};

export const specialiteBinome = async () => {
  const user = await currentUser();

  if (!user) return null;
  const binomeId = await getBinomeId(user.id!);
  if (!binomeId) return null;

  const specialite = await db.binome.findUnique({
    where: { id: binomeId },
    include: {
      etudiants: {
        include: {
          specialite: { select: { nom: true } },
        },
      },
    },
  });

  return specialite;
};
