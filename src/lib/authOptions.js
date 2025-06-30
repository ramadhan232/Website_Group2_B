import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider.default({
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
            name: user.name,
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
        token.id = user.id;
        console.log('Setting token.role =', user.role);
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      return session;
    },
    async redirect({ url, baseUrl, token, user }) {
      const role = token?.role || user?.role;

      console.log('🔁 Redirecting based on role:', role);

      if (role === 'teacher') return `${baseUrl}/teacher/dashboard/home`;
      if (role === 'student') return `${baseUrl}/student/dashboard/home`;
      return baseUrl;
    }, 
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};