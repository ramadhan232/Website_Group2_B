// app/student/home/layout.jsx
'use client';

import { SessionProvider } from 'next-auth/react';
import StudentNavbar from '@/components/student/StudentNavbar';

export default function StudentLayout({ children }) {
  return (
    <SessionProvider>
        <StudentNavbar />
      <div className="min-h-screen p-6 bg-gray-100">
        {children}
      </div>
    </SessionProvider>
  );
}
