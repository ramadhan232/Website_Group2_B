'use client';

import { useEffect, useState } from 'react';

export default function HotsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch('/api/hots-question');
      const data = await res.json();
      setQuestions(data);
      setLoading(false);
    }

    fetchQuestions();
  }, []);

  return (
    <div className='min-w-screen bg-amber-50'>
    <div className="block p-6 max-w-4xl mx-auto bg-amber-600">
      <h1 className="text-2xl font-bold mb-4">🔥 HOTS Questions</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.question_id} className="bg-white p-4 rounded shadow border">
              <h2 className="font-semibold text-blue-700">
                {q.question_id} – Chapter {q.chapter_number}
              </h2>
              <p className="text-gray-700 mt-1">{q.question_text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Type: <strong>{q.activity_format}</strong> | Activity: <em>{q.activity_type}</em>
              </p>
              <p className="text-xs text-gray-400">Source: {q.source}</p>

              {/* Link ke pengerjaan */}
              <a
                href={`/student/dashboard/hots/${q.question_id}`}
                className="mt-3 inline-block text-blue-600 hover:underline text-sm"
              >
                Kerjakan Soal →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
