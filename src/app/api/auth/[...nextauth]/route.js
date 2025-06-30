import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";



const handler = NextAuth.default(authOptions);
export { handler as GET, handler as POST };
