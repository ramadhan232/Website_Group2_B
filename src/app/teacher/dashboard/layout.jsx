// app/Teacher/home/layout.jsx
'use client';

import "@/styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import TeacherNavbar from '@/components/teacher/TeacherNavbar';

export default function TeacherLayout({ children }) {
  return (
    <SessionProvider>
        <TeacherNavbar />
      <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
        {children}
      </div>
    </SessionProvider>
  );
}
