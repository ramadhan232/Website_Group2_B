'use client';
import React from 'react';
import { useEffect, useState } from 'react';

export default function TeacherScoreSummaryPage() {
  const [summaries, setSummaries] = useState([]);
  const [chapter, setChapter] = useState('');
  const [student, setStudent] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch('/api/students'); // ✅ pastikan endpoint ini ada
      const data = await res.json();
      setStudents(data);
    }

    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchSummaries() {
      const query = [];
      if (chapter) query.push(`chapter=${chapter}`);
      if (student) query.push(`student_id=${student}`);
      const url = `/api/score-summary${query.length ? '?' + query.join('&') : ''}`;

      const res = await fetch(url);
      const data = await res.json();
      setSummaries(data);
    }

    fetchSummaries();
  }, [chapter, student]);

  const grouped = summaries.reduce((acc, summary) => {
    const studentId = summary.student_id._id;
    if (!acc[studentId]) acc[studentId] = { student: summary.student_id, data: [] };
    acc[studentId].data.push(summary);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 gap-y-2">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📈 Recap of Student Scores</h1>

      {/* Filter */}
      <div className="flex gap-4 mb-4 text-black">
        <div>
          <label className="text-sm font-medium">Chapter:</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="ml-2 border rounded p-1 bg-gray-50"
          >
            <option value="">All</option>
            {[1, 2, 3, 4].map((ch) => (
              <option key={ch} value={ch}>
                Bab {ch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium ">Students:</label>
          <select
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="ml-2 border rounded p-1 bg-gray-50"
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

      {/* Tabel */}
      <div className="overflow-x-auto bg-white shadow rounded-lg text-black">
        <table className="min-w-full border">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-2 border">Students</th>
              <th className="p-2 border">Chapters</th>
              <th className="p-2 border">Averages</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(grouped).map(({ student, data }) => {
              const perChapter = data.filter((d) => d.level === 'per_chapter');
              const total = data.find((d) => d.level === 'total');

              return (
                <React.Fragment key={student._id}>
                  {perChapter
                    .sort((a, b) => a.chapter_number - b.chapter_number)
                    .map((s) => (
                      <tr key={s._id} className="text-sm text-center">
                        <td className="border p-2">{student.name}</td>
                        <td className="border p-2">{s.chapter_number}</td>
                        <td className="border p-2">{s.average_score.toFixed(2)}</td>
                        <td className="border p-2">{new Date(s.generated_at).toLocaleDateString()}</td>
                      </tr>
                    ))}

                  {total && (
                    <tr key={`total-${student._id}`} className="text-sm font-semibold text-center ">
                      <td className="border p-2 bg-gray-100" colSpan={2}>Total</td>
                      <td className="border p-2">{total.average_score.toFixed(2)}</td>
                      <td className="border p-2">{new Date(total.generated_at).toLocaleDateString()}</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {summaries.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data ringkasan skor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
