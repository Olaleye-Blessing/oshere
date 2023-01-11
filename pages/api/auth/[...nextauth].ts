import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db, firebaseConfig } from "./../../../configs/firebase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
};

export default NextAuth(authOptions);
