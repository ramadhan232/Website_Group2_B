// app/student/home/layout.jsx
'use client';

import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import StudentNavbar from '@/components/student/StudentNavbar';

export default function StudentLayout({ children }) {
  return (
    <SessionProvider>
        <StudentNavbar />
      <div className="flex justify-center min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-white px-4">
        {children}
      </div>
    </SessionProvider>
  );
}
