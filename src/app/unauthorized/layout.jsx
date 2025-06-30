'use client';
import { SessionProvider } from 'next-auth/react';

export default function UnauthorizedLayout({ children }) {
  return (
        <SessionProvider > 
      <div className="bg-gray-100 text-gray-800 min-h-screen flex items-center justify-center">
        {children}
      </div></SessionProvider>
  );
}
