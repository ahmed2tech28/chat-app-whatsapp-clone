import UserModel from "@/db/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import connectDb from "@/db/connectDb";

const handler: NextAuthOptions = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any): Promise<any> {
        connectDb();
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await UserModel.findOne({ email: credentials.email });

        if (user && (await user.comparePassword(credentials.password))) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
