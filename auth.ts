// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // Import the edge-safe config
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Set up the connection to PostgreSQL
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 2. Merge the configs and add the heavy database logic
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // Unpack the safe config here
  adapter: PrismaAdapter(prisma), 
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch the user directly from PostgreSQL
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user || !user.passwordHash) return null;

        // Compare the hashes securely
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (passwordsMatch) return user;
        return null;
      }
    })
  ]
});