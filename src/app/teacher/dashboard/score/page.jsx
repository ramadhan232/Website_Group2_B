'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeacherScoresPage() {
  const [scores, setScores] = useState([]);
  const [chapter, setChapter] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isSaving, setIsSaving] = useState({});

  // ✅ Fetch daftar siswa
  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch('/api/students'); // pastikan endpoint ini tersedia
      const data = await res.json();
      setStudents(data);
    }

    fetchStudents();
  }, []);

  // ✅ Fetch skor berdasarkan filter
  useEffect(() => {
    async function fetchScores() {
      const query = [];
      if (chapter) query.push(`chapter_number=${chapter}`);
      if (selectedStudent) query.push(`student_id=${selectedStudent}`);
      const url = `/api/score${query.length ? `?${query.join('&')}` : ''}`;

      const res = await fetch(url);
      const data = await res.json();
      setScores(data);
    }

    fetchScores();
  }, [chapter, selectedStudent]);

  const handleScoreChange = (id, value) => {
    setScores((prev) =>
      prev.map((s) => (s._id === id ? { ...s, score: Number(value) } : s))
    );
  };

  const handleCommentChange = (id, value) => {
    setScores((prev) =>
      prev.map((s) => (s._id === id ? { ...s, comment: value } : s))
    );
  };

  const saveScore = async (id) => {
    const scoreItem = scores.find((s) => s._id === id);
    setIsSaving((prev) => ({ ...prev, [id]: true }));

    const res = await fetch(`/api/scores/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: scoreItem.score,
        comment: scoreItem.comment,
      }),
    });

    if (res.ok) {
      alert('✅ Skor diperbarui!');
    } else {
      alert('❌ Gagal menyimpan');
    }

    setIsSaving((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">📊 Score Management</h1>
      <Link
        href="/teacher/dashboard/hots-review"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm mb-4 inline-block"
      >
        🔥 Nilai HOTS Siswa
      </Link>

      {/* Filter */}
      <div className="flex gap-4 mb-4 items-center">
        <div>
          <label className="text-sm font-medium">Filter Chapter:</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option value="">All</option>
            {[1, 2, 3, 4].map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Filter Siswa:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option value="">All</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Question</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id} className="text-sm">
                <td className="p-2 border">{s.student_id?.name || '-'}</td>
                <td className="p-2 border">{s.question_id}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={s.score}
                    onChange={(e) => handleScoreChange(s._id, e.target.value)}
                    className="w-16 border rounded px-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={s.comment || ''}
                    onChange={(e) => handleCommentChange(s._id, e.target.value)}
                    className="w-full border rounded px-2"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => saveScore(s._id)}
                    disabled={isSaving[s._id]}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    {isSaving[s._id] ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data skor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
