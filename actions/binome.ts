"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { binomeSchema } from "@/schemas";
import { Etat } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const validerBinome = async (binomeId: string, themeId: string) => {
  const user = await currentUser();

  if (!user || !user.role || !user.id) {
    return { error: "Unauthorized" };
  }

  const existingAffectation = await db.affectation.findFirst({
    where: {
      idBinome: binomeId,
    },
  });
  if (existingAffectation) {
    revalidatePath(`/u/${user.name}/binomes`);
    return { success: "Binome déjà affecté à un autre thème!" };
  }

  await db.affectation.create({
    data: {
      idBinome: binomeId,
      themeId: themeId,
      encadrantId: user.id,
    },
  });
  await db.choisirTheme.updateMany({
    where: {
      AND: [{ themeId: themeId }, { NOT: { binomeId: binomeId } }],
    },
    data: {
      etat: Etat.REFUSE,
    },
  });
  await db.choisirTheme.updateMany({
    where: {
      themeId: themeId,
      binomeId: binomeId,
    },
    data: {
      etat: Etat.VALIDE,
    },
  });
  revalidatePath(`/u/${user.name}/binomes`);
  return { success: "Modifications enregistrées!" };
};

export const ajouterBinome = async (values: z.infer<typeof binomeSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const validatedFields = binomeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }
  const { email, items, theme } = validatedFields.data;

  const binomeId = await db.binome.findFirst({
    where: {
      etudiants: {
        some: {
          email,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!binomeId) {
    return { error: "L'email n'est associé à aucun étudiant" };
  }

  const existingAffectation = await db.affectation.findUnique({
    where: {
      idBinome: binomeId.id,
    },
  });
  if (existingAffectation) {
    return { error: "cet étudiant est déjà affecter à un autre thèmes" };
  }
  const specialities = await db.specialite.findMany({
    where: {
      nom: {
        in: items.map((spe) => spe.label),
      },
    },
  });

  if (!specialities) {
    return { error: "Domaine est obligatoire" };
  }
  const themeId = await db.theme.create({
    data: {
      nom: theme,
      proposerId: user.id,
      themeSpecialites: {
        create: specialities.map((spe) => ({
          specialiteId: spe.id,
        })),
      },
    },
    select: {
      id: true,
      proposerId: true,
    },
  });

  await db.affectation.create({
    data: {
      idBinome: binomeId.id,
      themeId: themeId.id,
      encadrantId: themeId.proposerId,
    },
  });
  revalidatePath(`/u/${user.name}/binomes`);
  return { success: "Thème inséré!" };
};
