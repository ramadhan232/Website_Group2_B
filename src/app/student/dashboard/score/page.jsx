'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ScorePage() {
  const { data: session, status } = useSession();
  const [scoreSummary, setScoreSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchScores() {
      try {
        const res = await fetch(`/api/score-summary?student_id=${session.user.id}`);
        const data = await res.json();
        setScoreSummary(data);
      } catch (err) {
        console.error('❌ Gagal memuat skor:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, [status, session?.user?.id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!scoreSummary) {
    return <p className="p-6 text-red-600">Gagal mengambil data skor.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📊 Skor Saya</h1>

      <div className="mb-6 bg-white p-4 rounded shadow border">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Skor Keseluruhan</h2>
        <p className="text-3xl font-bold text-green-600">
          {scoreSummary.total_score} / {scoreSummary.total_possible}
        </p>
      </div>

      <div className="space-y-4">
        {scoreSummary.per_chapter?.map((item) => (
          <div key={item.chapter_number} className="bg-white p-4 rounded border shadow">
            <h3 className="text-md font-semibold text-blue-700">
              Chapter {item.chapter_number}
            </h3>
            <p className="text-gray-800">
              Skor: <span className="font-bold">{item.total_score}</span> dari {item.total_possible}
            </p>

            <ul className="text-sm text-gray-600 mt-2 list-disc ml-4">
              {item.details.map((d) => (
                <li key={d.question_id}>
                  {d.question_id}: {d.score} / {d.max_score}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
