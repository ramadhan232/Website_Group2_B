'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function HotsQuestionPage() {
  const { question_id } = useParams();
  const { data: session, status } = useSession();

  const [question, setQuestion] = useState(null);
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (status !== 'authenticated') return;
  if (!session?.user?.id) {
    console.warn('❌ session.user.id is missing');
    return;
  }

  async function fetchData() {
    try {
      const [qRes, aRes] = await Promise.all([
        fetch(`/api/hots-question/${question_id}`),
        fetch(`/api/hots-activity/check?question_id=${question_id}&student_id=${session.user.id}`),
      ]);

      if (!qRes.ok) throw new Error(`❌ /api/hots-question/${question_id} not found`);
      if (!aRes.ok) throw new Error(`❌ /api/hots-activity/check failed`);

      const q = await qRes.json();
      const act = await aRes.json();

      setQuestion(q);
      setAlreadyAnswered(act?.exists || false);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error:', err);
      setLoading(false);
    }
  }

  fetchData();
}, [status, session?.user?.id, question_id]);

    const parseMatching = (input) => {
    return input.split(',').map(pair => {
      const [left, right] = pair.trim().split('-');
      return { left: left.trim(), right: right.trim() };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      student_id: session.user.id,
      question_id: question.question_id,
      activity_format: question.activity_format,
    };

    if (question.activity_format === 'essay') {
      payload.essay_response = response;
    } else if (question.activity_format === 'matching') {
      payload.matching_response = parseMatching(response);
    }

    const res = await fetch('/api/hots-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setSubmitted(true);
      setResponse('');
    } else {
      const errData = await res.json();
      alert(`Gagal menyimpan jawaban: ${errData.error}`);
    }
  };

  // ✅ tampilkan loading saat awal
  if (loading || status === 'loading') {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (alreadyAnswered || submitted) {
    return (
      <div className="p-6 text-green-700 bg-green-50 rounded">
        ✅ Kamu sudah mengerjakan soal ini.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold text-blue-700 mb-2">🔥 HOTS – {question.question_id}</h1>
      <p className="text-gray-700 mb-1">{question.question_text}</p>
      <p className="text-sm text-gray-500 mb-4">
        Format: <strong>{question.activity_format}</strong> | Activity: {question.activity_type}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {question.activity_format === 'essay' ? (
          <textarea
            required
            rows={5}
            className="w-full border p-3 rounded"
            placeholder="Tulis jawabanmu..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        ) : (
          <input
            required
            type="text"
            className="w-full border p-3 rounded"
            placeholder="Contoh: A-1, B-3, C-2"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kirim Jawaban
        </button>
      </form>
    </div>
  );
}
