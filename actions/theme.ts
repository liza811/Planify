"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const ajouterTheme = async (specialites: string[], theme: string) => {
  const user = await currentUser();
  if (!user) {
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

  await db.theme.create({
    data: {
      nom: theme,
      proposerId: user.id,
      themeSpecialites: {
        create: specialities.map((spe) => ({
          specialiteId: spe.id,
        })),
      },
    },
    include: {
      themeSpecialites: {
        include: {
          specialite: true,
        },
      },
    },
  });

  revalidatePath(`/u/${user.name}/themes`);
  return { success: "Thème inséré!" };
};

export const getSpecialite = async (specialite: string) => {
  const user = await currentUser();

  const existingSpecialite = await db.specialite.findUnique({
    where: {
      nom: specialite,
    },
  });

  if (!existingSpecialite) {
    const createSpecialite = await db.specialite.create({
      data: {
        nom: specialite,
        departementId: user?.departementId,
      },
    });
    return createSpecialite;
  }

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
