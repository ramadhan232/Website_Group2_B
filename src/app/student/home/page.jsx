'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LogoutButton from '@/components/student/LogoutButton';

export default function StudentHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // tunggu dulu saat loading
    if (!session || session.user?.role !== 'student') {
      router.push('/student/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Pastikan session ada sebelum akses session.user
  const name = session?.user?.name;
  
  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {name ?? 'User'}!
      </h1>
      <LogoutButton />
    </div>
  );
}

