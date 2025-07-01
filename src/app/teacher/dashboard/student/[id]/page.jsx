'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentDetailPage() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [scores, setScores] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const [userRes, scoreRes, summaryRes] = await Promise.all([
          fetch(`/api/users/${id}`),
          fetch(`/api/score?student_id=${id}`),
          fetch(`/api/score-summary?student_id=${id}`),
        ]);

        const [userData, scoreData, summaryData] = await Promise.all([
          userRes.json(),
          scoreRes.json(),
          summaryRes.json(),
        ]);

        setStudent(userData);
        setScores(scoreData);
        setSummary(summaryData);
      } catch (error) {
        console.error('❌ Gagal memuat data siswa:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentData();
  }, [id]);

  const orderedSummaries = [
    ...summary
        .filter((s) => s.level !== 'total') // semua selain total
        .sort((a, b) => {
        if (a.student_id.name !== b.student_id.name) {
            return a.student_id.name.localeCompare(b.student_id.name); // sort nama
        }
        return (a.chapter_number ?? 0) - (b.chapter_number ?? 0); // sort bab
        }),
    ...summary.filter((s) => s.level === 'total'), // total di bawah
    ];

  if (loading) return <p className="p-6 text-gray-500">Loading student data...</p>;
  if (!student) return <p className="p-6 text-red-500">Student not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 gap-y-2">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">👤 Student Details</h1>
      <p className="text-gray-700 mb-4">
        <strong>Name:</strong> {student.name} <br />
        <strong>Username:</strong> {student.username}
      </p>

      <h2 className="text-xl font-semibold mt-6 text-gray-800 mb-2">📌 Individual Score</h2>
      <table className="w-full text-sm border mb-6 text-black text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Questions</th>
            <th className="border p-2">Chapter</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score._id} className="odd:bg-white even:bg-gray-50">
              <td className="border p-2">{score.question_id}</td>
              <td className="border p-2 text-center">{score.chapter_number}</td>
              <td className="border p-2 text-center">{score.score}</td>
              <td className="border p-2">{score.comment || '-'}</td>
            </tr>
          ))}
          {scores.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 p-4">
                No scores available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6 text-gray-800 mb-2">📊 Value Summary</h2>
      <table className="w-full text-sm border text-black text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Bab</th>
            <th className="border p-2">Level</th>
            <th className="border p-2">Averages</th>
            <th className="border p-2">Questions</th>
          </tr>
        </thead >
        <tbody>
         {orderedSummaries.map((s) => (
                <tr key={s._id} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{s.chapter_number || '-'}</td>
                <td className="border p-2">{s.level}</td>
                <td className="border p-2">{s.average_score}</td>
                <td className="border p-2">{s.total_questions}</td>
                </tr>
            ))}
          {summary.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 p-4">
                No summary values ​​available..
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
