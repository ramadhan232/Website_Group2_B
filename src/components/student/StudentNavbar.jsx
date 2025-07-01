'use client';
import '@/styles/globals.css';
import LogoutButton from '@/components/student/LogoutButton';
import { useSession, signOut } from 'next-auth/react';


export default function StudentNavbar() {
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
          <div className="md:flex text-blue-600  grid grid-cols-3 gap-x-3">
            <a href="/student/dashboard/home" className="font-medium"><span className='hover:text-blue-900'>Home</span></a>
            <a href="/student/dashboard/hots" className="font-medium"><span className='hover:text-blue-900'>HOTS</span></a>
            <a href="/student/dashboard/score" className="font-medium"><span className='hover:text-blue-900'>Score</span></a>
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center justify-items-end">
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
