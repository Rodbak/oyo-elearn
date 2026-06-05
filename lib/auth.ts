import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  type AuthPortal,
  dashboardPathForRole,
  portalToRole,
  roleMatchesPortal,
} from "@/lib/roles";
import type { UserRole } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      institutionId: string | null;
      image?: string | null;
    };
  }

  interface User {
    role: UserRole;
    institutionId: string | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    institutionId: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        portal: { label: "Portal", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.passwordHash || !user.isActive) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!valid) return null;

        const portal = credentials.portal as AuthPortal | undefined;
        if (portal && !roleMatchesPortal(user.role, portal)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          institutionId: user.institutionId,
          image: user.avatarUrl ?? user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.institutionId = user.institutionId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.institutionId = token.institutionId as string | null;
      }
      return session;
    },
  },
});

export const roleDashboardPaths: Record<UserRole, string> = {
  SUPER_ADMIN: "/dashboard/superadmin",
  INSTITUTION_ADMIN: "/dashboard/admin",
  INSTRUCTOR: "/dashboard/instructor",
  STUDENT: "/dashboard/student",
  GUARDIAN: "/dashboard/student",
};

export { dashboardPathForRole, portalToRole };
