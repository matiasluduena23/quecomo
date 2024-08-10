import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./app/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        update: {},
        create: {
          email: profile.email,
          name: profile.name ? profile.name : "",
          consultas: 20,
          avatar: profile.picture,
        },
      });
      return true;
    },
  },
});
