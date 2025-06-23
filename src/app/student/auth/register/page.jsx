'use client';

import RegisterFormStudent from '@/components/student/RegisterFormStudent';

export default function StudentRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Student Registration
        </h1>
        <RegisterFormStudent />
      </div>
    </div>
  );
}
