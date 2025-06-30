'use client'

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
      if (status === 'loading') return; // tunggu dulu saat loading
      if (!session || session.user?.role !== 'teacher') {
        router.push('/teacher/auth/login');
      }
    }, [session, status, router]);
  
    if (status === 'loading') {
      return <p>Loading...</p>;
    }
  
    // Pastikan session ada sebelum akses session.user
    const name = session?.user?.name;
    
  // ✅ Jika sudah login, tampilkan dashboard
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Teacher Dashboard</h1>
      <p className="text-gray-700">Welcome, {session.user.name} 👋</p>
    </section>
  );
}
