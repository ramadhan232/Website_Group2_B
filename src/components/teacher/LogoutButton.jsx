'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton({ redirectTo = '/' }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: redirectTo })}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
    >
      Logout
    </button>
  );
}
