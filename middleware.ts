// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Initialize NextAuth with ONLY the edge-safe config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

  // If they are trying to access the dashboard but are not logged in, redirect to login
  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

// This regex ensures middleware only runs on actual pages, ignoring images and CSS
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg).*)"],
}