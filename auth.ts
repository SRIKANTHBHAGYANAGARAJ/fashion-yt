import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { USERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { signinSchema } from "@/lib/schemas/forms";
import type { User } from "@/types";

async function findUserByEmail(email: string): Promise<User | null> {
  if (!isMongoConfigured()) return null;
  const db = await connectToDatabase();
  const doc = await db
    .collection<User>(USERS_COLLECTION)
    .findOne({ email: email.toLowerCase() });
  if (!doc) return null;
  const { _id, ...rest } = doc as User & { _id?: unknown };
  return { ...rest, id: rest.id || String(_id) };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = signinSchema.safeParse(credentials);
        if (!parsed.success) return null;
        try {
          const user = await findUserByEmail(parsed.data.email);
          if (!user?.passwordHash) return null;
          const match = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
          );
          if (!match) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch {
          return null;
        }
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider === "credentials") return true;
      if (!user.email || !isMongoConfigured()) return true;
      const db = await connectToDatabase();
      const email = user.email.toLowerCase();
      const existing = await db.collection<User>(USERS_COLLECTION).findOne({ email });
      if (!existing) {
        const id = crypto.randomUUID();
        await db.collection<User>(USERS_COLLECTION).insertOne({
          id,
          email,
          name: user.name ?? email.split("@")[0],
          image: user.image ?? undefined,
          role:
            email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "admin" : "customer",
          addresses: [],
          createdAt: new Date().toISOString(),
        } as User);
        user.id = id;
      } else {
        user.id = existing.id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        if (token.email) session.user.email = token.email as string;
      }
      return session;
    },
  },
});
