import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  departementId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
