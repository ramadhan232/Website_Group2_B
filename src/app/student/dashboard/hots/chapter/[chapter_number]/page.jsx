'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function HotsByChapterPage() {
  const { chapter_number } = useParams();
  const { data: session } = useSession();

  const [questions, setQuestions] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    if (!chapter_number) return;
    async function fetchData() {
      const qRes = await fetch(`/api/hots-question?chapter=${chapter_number}`);
      const qData = await qRes.json();
      setQuestions(qData);

      if (session?.user?.id) {
        const statusRes = await fetch(`/api/hots-activity/status?student_id=${session.user.id}&chapter=${chapter_number}`);
        const statusData = await statusRes.json();
        setStatusMap(statusData);
      }
    }

    fetchData();
  }, [chapter_number, session?.user?.id]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🔥 HOTS – Chapter {chapter_number}</h1>

      {questions.length === 0 ? (
        <p>Belum ada soal HOTS.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.question_id} className="border p-4 rounded shadow bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-blue-700 font-medium">{q.question_id}</h3>
                  <p className="text-gray-700">{q.question_text}</p>
                  <p className="text-sm text-gray-500">
                    Format: {q.activity_format} | Activity: {q.activity_type}
                  </p>
                </div>
                <span className={`text-sm font-semibold ${statusMap[q.question_id] ? 'text-green-600' : 'text-red-500'}`}>
                  {statusMap[q.question_id] ? '✔️ Sudah' : '❌ Belum'}
                </span>
              </div>

              <Link
                href={`/student/dashboard/hots/${q.question_id}`}
                className="text-blue-600 hover:underline text-sm inline-block mt-2"
              >
                Kerjakan →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
