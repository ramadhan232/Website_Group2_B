'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function UnauthorizedPage() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      setRole(session?.user?.role);
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">🚫 Unauthorized</h1>

        {role ? (
          <p className="text-gray-700 mb-6">
            You are logged in as <span className="font-semibold">{role}</span>. This page is not available for your role.
          </p>
        ) : (
          <p className="text-gray-700 mb-6">
            You do not have permission to access this page.
          </p>
        )}

        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
