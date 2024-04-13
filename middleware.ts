import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { NextResponse } from "next/server";
import { currentUser } from "./lib/current-user";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const session = await currentUser();

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // si enseignant
      if (session?.role) {
        return NextResponse.redirect(new URL(`/u/${session?.prenom}`, nextUrl));
      } else {
        return NextResponse.redirect(
          new URL(`/u/etudiant/${session?.prenom}/themes`, nextUrl)
        );
      }
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
