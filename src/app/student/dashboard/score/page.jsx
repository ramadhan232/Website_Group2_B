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
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📚 Skor Kamu</h1>

      {/* Tabel per soal */}
      <div className="bg-white shadow rounded mb-6 overflow-x-auto">
        <h2 className="text-lg font-semibold p-4 border-b">Detail Skor per Soal</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Soal</th>
              <th className="p-2 border">Bab</th>
              <th className="p-2 border">Skor</th>
              <th className="p-2 border">Komentar</th>
              <th className="p-2 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-2 border">{s.question_id}</td>
                <td className="p-2 border">Bab {s.chapter_number}</td>
                <td className="p-2 border">{s.score}</td>
                <td className="p-2 border">{s.comment || '-'}</td>
                <td className="p-2 border">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Belum ada skor yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ringkasan skor */}
      {summaries.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <h2 className="text-lg font-semibold p-4 border-b">📊 Ringkasan Nilai</h2>
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Level</th>
                <th className="p-2 border">Bab</th>
                <th className="p-2 border">Rata-rata</th>
                <th className="p-2 border">Jumlah Soal</th>
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
