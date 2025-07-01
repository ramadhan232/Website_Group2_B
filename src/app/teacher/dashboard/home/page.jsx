'use client'


import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
      if (status === 'loading') return; // tunggu dulu saat loading
      if (!session || session.user?.role !== 'teacher') {
        router.push('/teacher/auth/login');
      }
    }, [session, status, router]);

    useEffect(() => {
      async function fetchTeachers() {
        const res = await fetch('/api/teachers');
        const data = await res.json();
        setTeachers(data);
      }

      fetchTeachers();
    }, []);
  
    if (status === 'loading') {
      return <p>Loading...</p>;
    }
  
    // Pastikan session ada sebelum akses session.user
    const name = session?.user?.name;
    
  // ✅ Jika sudah login, tampilkan dashboard
  return (
    <section className="p-10 max-w-4xl mx-auto grid grid-cols-1 gap-y-4">
      <div>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Teacher Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome, {session.user.name} 👋</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">👨‍🏫 Members:</h2>
        {teachers.length === 0 ? (
          <p className="text-gray-500">There are no other teachers registered yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                {teacher.name} <span className="text-sm text-gray-500">({teacher.username})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
