"use server";

import { db } from "@/lib/db";
import { currentUser } from "../lib/current-user";

import { ExtendedUser } from "@/next-auth";
import { revalidatePath } from "next/cache";

export const getSpecialite = async (name: string, user: ExtendedUser) => {
  const existingSpecialite = await db.specialite.findUnique({
    where: { nom: name },
  });
  if (existingSpecialite) return existingSpecialite.id;

  const specialite = await db.specialite.create({
    data: {
      nom: name,
      departementId: user?.departementId,
    },
  });

  return specialite.id;
};

export const addEnseignants = async (specialite: string, data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const specialiteId = await getSpecialite(specialite.toUpperCase(), user);
  if (!specialiteId) {
    return { error: "Spécialité manquante" };
  }
  const existingEnseingant = await db.enseignant.findFirst({
    where: {
      email: data.email,
    },
  });

  try {
    if (!existingEnseingant) {
      const ens = await db.enseignant.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          grade: data.grade,
          matricule: data.matricule,
          specialiteId: specialiteId,
          departementId: user.departementId,
        },
      });
      // } else {
      //   await db.enseignant.update({
      //     where: {
      //       email: existingEnseingant.email,
      //     },
      //     data: {
      //       nom: data.nom,
      //       prenom: data.prenom,
      //       grade: data.grade,
      //       matricule: data.matricule,
      //       specialiteId: specialiteId,
      //       departementId: user.departementId,
      //     },
      //   });
    }
    revalidatePath("/dashboard/enseignant");
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Veuillez réessayer" };
  }
};

export const addEtudiants = async (specialite: string, data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const specialiteId = await getSpecialite(specialite.toUpperCase(), user);
  if (!specialiteId) {
    return { error: "Spécialité manquante" };
  }
  const existingEtudiant = await db.etudiant.findFirst({
    where: {
      email: data.email,
    },
  });

  try {
    if (!existingEtudiant) {
      const etud = await db.etudiant.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,

          matricule: data.matricule,
          specialiteId: specialiteId,
          departementId: user.departementId,
        },
      });
    }
    revalidatePath("/dashboard/etudiant");
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Veuillez réessayer" };
  }
};

export const addEnseignant = async (
  specialite: string,
  grade: string,
  data: any
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const specialiteId = await getSpecialite(specialite.toUpperCase(), user);
  if (!specialiteId) {
    return { error: "Spécialité manquante" };
  }
  const existingEnseingant = await db.enseignant.findFirst({
    where: {
      email: data.email,
    },
  });

  try {
    if (!existingEnseingant) {
      const ens = await db.enseignant.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          grade: grade,
          matricule: data.matricule,
          specialiteId: specialiteId,
          departementId: user.departementId,
        },
      });
    } else {
      return { error: "Enseignant existe déjà" };
    }
    revalidatePath("/dashboard/enseignant");
    return { success: "Enseignant ajouté!" };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Veuillez réessayer" };
  }
};

export const addEtudiant = async (specialite: string, data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const specialiteId = await getSpecialite(specialite.toUpperCase(), user);
  if (!specialiteId) {
    return { error: "Spécialité manquante" };
  }
  const existingEtudiant = await db.etudiant.findFirst({
    where: {
      email: data.email,
    },
  });

  try {
    if (!existingEtudiant) {
      await db.etudiant.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,

          matricule: data.matricule,
          specialiteId: specialiteId,
          departementId: user.departementId,
        },
      });
    } else {
      return { error: "Etudiant existe déjà" };
    }
    revalidatePath("/dashboard/etudiants");
    return { success: "Etudiant ajouté!" };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Veuillez réessayer" };
  }
};
