import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  departementId: string;
  nom: string;
  prenom: string;
  role: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
