'use client';

import React, { useEffect, useState } from 'react';

export default function StudentScoresPage() {
  const [scores, setScores] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch('/api/students/scores'); // pastikan endpoint ini ada
        const data = await res.json();
        setScores(data.scores || []);
        setSummaries(data.summaries || []);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching scores:', err);
        setLoading(false);
      }
    }

    fetchScores();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Your Scores</h1>

      {/* Tabel per soal */}
      <div className="bg-white shadow rounded mb-6 overflow-x-auto">
        <h2 className="text-lg font-semibold p-4 border-b text-black">Scores Details</h2>
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-100 text-center text-black">
            <tr>
              <th className="p-2 border">Questions</th>
              <th className="p-2 border">Chapter</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Comments</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id} className="border-b text-center">
                <td className="p-2 border">{s.question_id}</td>
                <td className="p-2 border">Chapter {s.chapter_number}</td>
                <td className="p-2 border">{s.score}</td>
                <td className="p-2 border">{s.comment || '-'}</td>
                <td className="p-2 border">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  There are no scores available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ringkasan skor */}
      {summaries.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <h2 className="text-lg font-semibold p-4 border-b text-black">Ringkasan Nilai</h2>
          <table className="min-w-full text-sm text-black text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Level</th>
                <th className="p-2 border">Chapter</th>
                <th className="p-2 border">Average Scores</th>
                <th className="p-2 border">Questions</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((sum) => (
                <tr key={sum._id}>
                  <td className="p-2 border capitalize">{sum.level.replace('_', ' ')}</td>
                  <td className="p-2 border">{sum.chapter_number || '-'}</td>
                  <td className="p-2 border">{sum.average_score.toFixed(2)}</td>
                  <td className="p-2 border">{sum.total_questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
