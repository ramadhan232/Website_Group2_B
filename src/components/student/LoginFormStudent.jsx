'use client';

import "@/styles/globals.css";
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginFormStudent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      router.push('/student/dashboard/home');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="grid grid-col items-center justify-center min-h-80 bg-white m-8 rounded-2xl shadow-md min-w-md">
      {/* Heading */}
  <div className="text-center space-y-1 m-6">
    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
    <p className="text-sm text-gray-500">Sign in to your account to continue</p>
  </div>
    <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 w-full md:min-w-sm gap-6"
>
  

  {/* Username */}
  <div className="space-y-1">
    <div className="flex flex-row gap-2 items-center">
      <User className="h-4 w-4" />
    <label htmlFor="username" className="col-span-3 text-sm font-medium text-gray-700">
      Username
    </label>
    </div>
    
    <div className="relative">
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Your Username"
        className="w-sm  text-sm rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Password */}
  <div className="space-y-1">
    <div className="flex flex-row gap-2 items-center">
      <Lock className="h-4 w-4" />
      <label htmlFor="password" className="text-sm font-medium text-gray-700">
      Password
    </label>
    </div>
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="your password"
        className="w-full pl-10  text-sm rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label="Toggle password visibility"
        className="absolute inset-y-0 right-1 pr-3 flex items-center text-gray-400 hover:text-gray-700"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full h-8 bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm font-semibold rounded-lg transition-colors"
  >
    Login
  </button>

  {/* Footer */}
  <p className="text-center text-sm text-gray-500">
    Don’t have an account?{' '}
    <Link href="/student/auth/register" className="text-indigo-600 hover:underline font-medium">
      Sign up
    </Link>
  </p>
</form>
</div>
  );
}
