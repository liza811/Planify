import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./lib/user";
import { getTwoFactorConfirmationByUserId } from "./lib/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await getUserById(user.id);

        // const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        //   existingUser?.id as string
        // );
        // if (!twoFactorConfirmation) return false;
        // // Delete two factor confirmation for next sign in
        // await db.twoFactorConfirmation.delete({
        //   where: { id: twoFactorConfirmation.id },
        // });
      }

      // if (existingUser.isTwoFactorEnabled) {

      //

      // }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.prenom as string;

        session.user.image = token.picture;
        session.user.email = token.email as string;
      }
      if (session.user) {
        session.user.departementId = token.departementId as string;
        session.user.nom = token.nom as string;
        session.user.prenom = token.prenom as string;
        session.user.role = token.role as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // token.isOAuth = !!existingAccount;
      token.name = existingUser.nom;
      token.prenom = existingUser.prenom;
      token.email = existingUser.email;
      token.departementId = existingUser.departementId;

      token.role = existingUser.isEnseignant;
      token.nom = existingUser.nom;
      token.prenom = existingUser.prenom;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
