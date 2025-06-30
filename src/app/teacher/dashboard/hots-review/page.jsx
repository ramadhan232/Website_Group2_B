'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function HotsReviewPage() {
  const [activities, setActivities] = useState([]);
  const { data: session } = useSession();

  const [scoreInput, setScoreInput] = useState({}); // {activity_id: {score, comment}}

  useEffect(() => {
    fetch('/api/hots-activity/unscored')
      .then((res) => res.json())
      .then(setActivities);
  }, []);

  const handleChange = (id, field, value) => {
    setScoreInput((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (activity) => {
    const input = scoreInput[activity._id];
    if (!input || !input.score) return alert('Skor wajib diisi');

    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: activity.student_id._id,
        question_id: activity.question_id,
        score: Number(input.score),
        comment: input.comment || '',
        teacher_id: session.user.id,
      }),
    });

    if (res.ok) {
      setActivities((prev) => prev.filter((a) => a._id !== activity._id));
    } else {
      alert('Gagal menyimpan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Penilaian HOTS</h1>

      {activities.length === 0 ? (
        <p className="text-gray-500">Semua jawaban sudah dinilai ✅</p>
      ) : (
        activities.map((act) => (
          <div key={act._id} className="border p-4 rounded mb-4 bg-white shadow">
            <div className="mb-1 text-sm text-gray-600">
              <strong>Siswa:</strong> {act.student_id.name} ({act.student_id.username}) <br />
              <strong>Soal:</strong> {act.question?.question_text}
            </div>

            <div className="bg-gray-50 p-3 rounded text-sm mb-2">
              <strong>Jawaban:</strong><br />
              {act.activity_format === 'essay'
                ? act.essay_response
                : act.matching_response.map((m, i) => (
                    <div key={i}>{m.left} → {m.right}</div>
                  ))}
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                max="100"
                className="border p-2 rounded w-20"
                placeholder="Skor"
                value={scoreInput[act._id]?.score || ''}
                onChange={(e) => handleChange(act._id, 'score', e.target.value)}
              />
              <input
                type="text"
                className="border p-2 rounded flex-1"
                placeholder="Komentar (opsional)"
                value={scoreInput[act._id]?.comment || ''}
                onChange={(e) => handleChange(act._id, 'comment', e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={() => handleSubmit(act)}
              >
                Simpan
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
