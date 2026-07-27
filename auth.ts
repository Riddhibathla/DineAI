import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8).max(128) });
const providers = [
  Credentials({
    credentials: { email: {}, password: {} },
    async authorize(raw) {
      const parsed = credentialsSchema.safeParse(raw);
      if (!parsed.success) return null;
      await connectDB();
      const user = await User.findOne({ email: parsed.data.email.toLowerCase(), archivedAt: null })
        .select("+passwordHash")
        .lean() as null | { _id: unknown; email: string; name: string; role: string; emailVerified?: Date; passwordHash?: string };
      if (!user?.passwordHash || !user.emailVerified || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null;
      return { id: String(user._id), email: user.email, name: user.name, role: user.role };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }) as never);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers,
});
