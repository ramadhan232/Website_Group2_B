'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function SubmittedHotsPage() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchActivities() {
      const res = await fetch(`/api/hots-activity?student_id=${session.user.id}`);
      const data = await res.json();
      setActivities(data);
      setLoading(false);
    }

    fetchActivities();
  }, [session]);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen" >
      <h1 className="text-2xl font-bold mb-4">📚 Semua HOTS yang Telah Dijawab</h1>

      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">Kamu belum mengerjakan soal HOTS.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((act, i) => (
            <li key={i} className="bg-white border rounded p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-700">
                    Soal {act.question_id} ({act.activity_format})
                  </p>
                  <p className="text-sm text-gray-500">Jawaban: {act.response}</p>
                </div>
                <div className="text-right">
                  {act.is_reviewed ? (
                    <p className="text-green-600 font-medium">
                      ✅ Dinilai – Skor: {act.score}
                    </p>
                  ) : (
                    <p className="text-yellow-500 font-medium">⏳ Belum dinilai</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
