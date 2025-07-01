'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterFormStudent() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.name || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    const res = await fetch('/api/register/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, role: 'student' }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Registration failed');
    } else {
      router.push('login');
    }
  };

  return (
    <div className="grid grid-col items-center justify-center min-h-60 bg-white m-8 rounded-2xl shadow-md  max-w-full" >
      <div className="grid grid-col items-center justify-center gap-6 text-center space-y-1 m-6">
        <h1 className='text-xl font-bold text-black'> Student Registration </h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 w-full md:min-w-md gap-3">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="max-w-full text-black px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="max-w-full text-black px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="max-w-full px-3 text-black py-2 border rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="max-w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
    </div>
    </div>
  );
}
