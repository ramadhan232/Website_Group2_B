// src/app/layout.jsx


import "@/styles/globals.css";
// import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'English Lens',
  description: 'Reading comprehension platform for SMA Kelas X',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

