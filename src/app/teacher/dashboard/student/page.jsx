'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeacherStudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch('/api/users?role=student');
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    }

    fetchStudents();
  }, []);

  if (loading) return <p className="p-6">Loading students...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 gap-y-2">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">👩‍🎓 Student List</h1>

      <table className="w-full border text-sm text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">#</th>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Username</th>
            <th className="text-center p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={student._id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.username}</td>
              <td className="p-2 border text-center">
                <Link
                  href={`/teacher/dashboard/student/${student._id}`}
                  className="text-blue-600 hover:underline"
                >
                  📊 View Score
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
