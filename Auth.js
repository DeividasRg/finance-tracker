import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUsers } from "./app/_services/apiAuth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async signIn({ user }) {
      const users = await getUsers();

      if (users.some((us) => us.email === user.email)) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
});
