'use client';

import LogoutButton from '@/components/Teacher/LogoutButton';
import { useSession, signOut } from 'next-auth/react';


export default function TeacherNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow sticky top-0 z-50 space-x-3">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">English Lens</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 flex-row gap-8">
            <a href="/teacher/dashboard/home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="/teacher/dashboard/student" className="text-gray-700 hover:text-blue-600 font-medium">Student</a>
            <a href="/teacher/dashboard/score" className="text-gray-700 hover:text-blue-600 font-medium">Skor</a>
            <a href="/dashboard/teacher/hots/summary" className="text-gray-700 hover:text-blue-600 font-medium">Summary</a>
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center space-x-4 justify-items-end">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {session?.user?.name?.[0] || 'S'}
              </div>
              <span className="hidden md:block text-sm text-gray-600">{session?.user?.name || 'Siswa'}</span>
            </div>

            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
