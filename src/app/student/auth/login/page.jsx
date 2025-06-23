import LoginFormStudent from '@/components/student/LoginFormStudent';
import Link from 'next/link';

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Student Login
        </h1>
        <LoginFormStudent />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/student/auth/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
