import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            username: user.username,
            role: user.role, // ⬅️ Sertakan role
          };
        }

        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/student/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
