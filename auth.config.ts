// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login', // Redirects users here if they aren't authorized
  },
  providers: [], // We leave this empty here, and add the real ones in auth.ts
} satisfies NextAuthConfig;