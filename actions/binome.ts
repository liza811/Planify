"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Etat } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
