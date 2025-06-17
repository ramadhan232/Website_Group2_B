import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // ⛔ Jika belum login, redirect ke halaman login
  if (!session) {
    redirect('/auth/login');
  }

  // ✅ Jika sudah login, tampilkan dashboard
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Teacher Dashboard</h1>
      <p className="text-gray-700">Welcome, {session.user.name} 👋</p>
    </section>
  );
}
