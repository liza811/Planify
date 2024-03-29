"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteEnseignant = async (email: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const enseignantExist = await db.enseignant.findUnique({
    where: { email },
  });

  if (!enseignantExist) {
    return { error: "Enseignant pas trouvé" };
  }

  const enseignant = await db.enseignant.delete({
    where: {
      email,
    },
  });

  //   revalidatePath(`/u/${self.username}/community`);
  revalidatePath(`/dashboard/enseignants`);
  return { success: enseignant };
};

export const deleteEtudiant = async (email: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const entudiantExist = await db.etudiant.findUnique({
    where: { email },
  });

  if (!entudiantExist) {
    return { error: "Etudiant pas trouvé" };
  }

  const etudiant = await db.etudiant.delete({
    where: {
      email,
    },
  });

  //   revalidatePath(`/u/${self.username}/community`);
  revalidatePath(`/dashboard/etudiants`);
  return { success: etudiant };
};
