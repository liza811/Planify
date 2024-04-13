import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.enseignant.findUnique({ where: { email } });
    const isEnseignant = !!user;
    if (!isEnseignant) {
      const user = await db.etudiant.findUnique({ where: { email } });
      return { ...user, isEnseignant: false };
    }
    return { ...user, isEnseignant: true };
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.enseignant.findUnique({ where: { id } });
    const isEnseignant = !!user;
    if (!isEnseignant) {
      const user = await db.etudiant.findUnique({ where: { id } });
      return { ...user, isEnseignant: false };
    }
    return { ...user, isEnseignant: true };
  } catch {
    return null;
  }
};
