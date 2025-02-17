"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { auth, signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/user";

import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/lib/two-factor-auth";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { db } from "@/lib/db";

export const Login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Champs invalides!" };
  }
  if (existingUser.matricule !== password) {
    return { error: "Champs invalides!" };
  }

  if (existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Code invalid!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Code invalid!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expiré!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id as string
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      if (existingUser.isEnseignant) {
        await db.twoFactorConfirmation.create({
          data: {
            ensId: existingUser.id,
          },
        });
      } else {
        await db.twoFactorConfirmation.create({
          data: {
            etudId: existingUser.id,
          },
        });
      }
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/u/${existingUser.prenom?.toLowerCase()}`,
    });
    return { success: "" };
  } catch (error) {
    console.log(` ${error}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Champs invalides!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
