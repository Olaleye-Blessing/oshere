import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firebaseConfig } from "@/configs/firebase";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
