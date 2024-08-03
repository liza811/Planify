"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const ajouterTheme = async (
  specialites: string[],
  theme: string,
  domaine: string
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }
  if (specialites.length === 0) {
    return {
      error: "Vous devez choisir au moins une spécialité pour le thème.",
    };
  }

  // retourner les specialitees
  const specialities = await db.specialite.findMany({
    where: {
      nom: {
        in: specialites,
      },
      departementId: user.departementId,
    },
  });

  if (!specialities) {
    return { error: "Spécialitée est obligatoire" };
  }

  await db.theme.create({
    data: {
      nom: theme,
      proposerId: user.id,
      domaineId: domaine,
      themeSpecialites: {
        create: specialities.map((spe) => ({
          specialiteId: spe.id,
        })),
      },
    },
  });

  revalidatePath(`/u/${user.name}/themes`);
  return { success: "Thème inséré!" };
};

export const affecterTheme = async (
  specialites: string[],
  theme: string,
  idBinome: string,
  domaine: string
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }
  if (specialites.length === 0) {
    return {
      error: "Vous devez choisir au moins une spécialité pour le thème.",
    };
  }

  // retourner les specialitees
  const specialities = await db.specialite.findMany({
    where: {
      nom: {
        in: specialites,
      },
    },
  });

  if (!specialities) {
    return { error: "Domaine est obligatoire" };
  }

  const themee = await db.theme.create({
    data: {
      nom: theme,
      domaineId: domaine,
      proposerId: user.id,
      themeSpecialites: {
        create: specialities.map((spe) => ({
          specialiteId: spe.id,
        })),
      },
    },
  });
  await db.affectation.update({
    where: {
      idBinome: idBinome,
    },
    data: {
      themeId: themee.id,
    },
  });

  revalidatePath(`/u/${user.name}/binomes`);
  return { success: "affectation enregistrée!" };
};
export const updateTheme = async (
  specialites: string[] | undefined,
  theme: string,
  themeId: string,
  domaine: string
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  if (!specialites || specialites.length === 0) {
    return {
      error: "Vous devez choisir au moins une spécialité pour le thème.",
    };
  }

  // retourner les specialitees
  const specialities = await db.specialite.findMany({
    where: {
      departementId: user.departementId,
      nom: {
        in: specialites,
      },
    },
    select: {
      id: true,
    },
  });

  if (!specialities) {
    return { error: "Domaine est obligatoire" };
  }
  await db.themeSpecialite.deleteMany({
    where: {
      themeId: themeId,
    },
  });
  await db.theme.update({
    where: {
      id: themeId,
    },
    data: {
      nom: theme,
      domaineId: domaine,

      themeSpecialites: {
        create: specialities.map((spe) => ({
          specialiteId: spe.id,
        })),
      },
    },
  });

  revalidatePath(`/u/${user.name}/themes`);
  return { success: "Modifications insérées!" };
};

export const getSpecialite = async (specialite: string) => {
  const user = await currentUser();

  const existingSpecialite = await db.specialite.findFirst({
    where: {
      nom: specialite,
      departementId: user?.departementId,
    },
  });

  return existingSpecialite;
};

export const deleteTheme = async (themeId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await db.theme.delete({
      where: {
        id: themeId,
        proposerId: user.id,
      },
    });
    revalidatePath(`/u/${user.name}/themes`);
    return { success: "Thème supprimé!" };
  } catch (error) {
    revalidatePath(`/u/${user.name}/themes`);
    return { error: "Veuillez réessayer" };
  }
};
