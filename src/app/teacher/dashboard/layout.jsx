// app/Teacher/home/layout.jsx
'use client';

import { SessionProvider } from 'next-auth/react';
import TeacherNavbar from '@/components/teacher/TeacherNavbar';

export default function TeacherLayout({ children }) {
  return (
    <SessionProvider>
        <TeacherNavbar />
      <div className="min-h-screen p-6 bg-gray-100">
        {children}
      </div>
    </SessionProvider>
  );
}
