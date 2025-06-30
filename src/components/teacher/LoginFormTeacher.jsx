'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginFormTeacher({ role = 'teacher' }) {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await signIn('credentials', {
      ...form,
      redirect: false
    });

    if (res.ok) {
      router.push('/teacher/dashboard');
    } else {
      setError('Login gagal. Periksa kembali username & password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold text-center text-blue-700 mb-2">Login Guru</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full border p-2 rounded"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={form.password}
        onChange={handleChange}
        required
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Masuk
      </button>
    </form>
  );
}
