import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? "CUSTOMER";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Populated in auth.ts
} satisfies NextAuthConfig;
