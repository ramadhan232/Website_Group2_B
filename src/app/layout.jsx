// src/app/layout.jsx


import "@/styles/globals.css";
// import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
// const inter = Inter({ subsets: ["latin"] });
import NextAuthProvider from './providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'English Lens',
  description: 'Reading comprehension platform for SMA Kelas X',
};


export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

