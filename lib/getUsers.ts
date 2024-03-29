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
