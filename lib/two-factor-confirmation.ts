import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { ensId: userId },
    });
    if (!twoFactorConfirmation) {
      const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
        where: { etudId: userId },
      });
      return twoFactorConfirmation;
    }

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
