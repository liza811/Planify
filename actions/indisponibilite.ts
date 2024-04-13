"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const AddIndisponibilite = async (
  from: String | undefined,
  to: String | undefined
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!from || !to) {
    return null;
  }

  const indisponibilites = {
    from: from as string,
    to: to as string,
  };

  try {
    const indisponibilite = await db.enseignant.update({
      where: {
        id: user.id,
      },
      data: {
        datesIndisponibles: indisponibilites,
      },
    });
    revalidatePath(`/u/${user.prenom}`);
    return { success: "mofification insérées!" };
  } catch {
    return { error: "Veuillez réessayer" };
  }
};

export const resetIndisponibilite = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await db.enseignant.update({
      where: {
        id: user.id,
      },
      data: {
        datesIndisponibles: "",
      },
    });
    revalidatePath(`/u/${user.name}`);
    return { success: "mofification insérées!" };
  } catch {
    return { error: "Veuillez réessayer" };
  }
};
