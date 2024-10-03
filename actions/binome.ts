"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { binomeSchema } from "@/schemas";
import { Etat, Etat_Binome, NotificationType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";

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

  const aff = await db.affectation.create({
    data: {
      idBinome: binomeId,
      themeId: themeId,
      encadrantId: user.id,
    },
    select: {
      Binome: {
        select: {
          etudiants: {
            select: {
              id: true,
            },
          },
        },
      },
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
  if (aff && binomeId) {
    const content = `${user.nom} ${user.prenom} a validé votre choix`;
    if (aff.Binome.etudiants[0]?.id) {
      const notifs = await db.notification.create({
        data: {
          content: content,
          to: { connect: { id: aff.Binome.etudiants[0]?.id } },
          type: NotificationType.E_TO_B,
        },
      });
      await pusherServer.trigger(
        aff.Binome.etudiants[0]?.id,
        "valider",
        notifs
      );
    }
    if (aff.Binome.etudiants[1]?.id) {
      const notifs = await db.notification.create({
        data: {
          content: content,
          to: { connect: { id: aff.Binome.etudiants[1]?.id } },
          type: NotificationType.E_TO_B,
        },
      });
      await pusherServer.trigger(
        aff.Binome.etudiants[1]?.id,
        "valider",
        notifs
      );
    }
  }
  revalidatePath(`/u/${user.name}/binomes`);
  return { success: "Modifications enregistrées!" };
};

export const binomeTerminer = async (binomeId: string) => {
  const user = await currentUser();

  if (!user || !user.role || !user.id) {
    return { error: "Unauthorized" };
  }

  await db.affectation.update({
    where: {
      idBinome: binomeId,
    },
    data: {
      etat: Etat_Binome.TERMINE,
    },
  });

  revalidatePath(`/u/${user.name}/binomes`);
  return { success: "Modifications enregistrées!" };
};
export const ajouterBinome = async (
  values: z.infer<typeof binomeSchema>,
  specialites: string[]
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }
  const validatedFields = binomeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }
  const { email, theme, domaine } = validatedFields.data;

  const binomeId = await db.binome.findFirst({
    where: {
      etudiants: {
        some: {
          email: email.trim(),
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!binomeId) {
    return { error: "L'email n'est associé à aucun étudiant." };
  }

  const existingAffectation = await db.affectation.findUnique({
    where: {
      idBinome: binomeId.id,
    },
  });
  if (existingAffectation) {
    return { error: "cet étudiant est déjà affecter à un autre thèmes." };
  }
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
  const themeId = await db.theme.create({
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
  return { success: "Affectation insérée!" };
};
