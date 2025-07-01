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
    <div className="grid p-6 max-w-6xl grid-cols-1 gap-2 mx-auto">
      <h1 className="text-2xl text-black font-bold mb-4">HOTS Questions</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="max-w-full grid grid-cols-2 gap-x-4 gap-y-4">
          {questions.map((q) => (
            <div key={q.question_id} className="bg-white p-4 rounded shadow border">
              <h2 className="font-semibold text-blue-700">
                {q.question_id} - Chapter {q.chapter_number}
              </h2>
              <p className="text-gray-700 mt-1">{q.question_text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Type: <strong>{q.activity_format}</strong> | Activity: <em>{q.activity_type}</em>
              </p>
              <p className="text-xs text-gray-400">Source: {q.source}</p>
              

              {/* Link ke pengerjaan */}
              <a
                href={`/student/dashboard/hots/${q.question_id}`}
                className=""
              ><span className='mt-3 items-end-safe inline-block text-blue-600 hover:underline text-sm'>
                Do the Questions HOTS →</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
