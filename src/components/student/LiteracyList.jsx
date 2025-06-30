'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LiteracyList() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiteracy() {
      try {
        const res = await fetch('/api/literacy');
        const data = await res.json();
        setChapters(data);
      } catch (err) {
        console.error('❌ Gagal mengambil data literacy:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiteracy();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">📚 Materi Literacy (Semester 1)</h1>

      {loading ? (
        <p className="text-gray-500">Loading materi...</p>
      ) : chapters.length === 0 ? (
        <p className="text-gray-500">Belum ada materi literacy tersedia.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {chapters.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow border hover:shadow-md">
              <h2 className="text-lg font-semibold text-blue-800 mb-1">
                Chapter {item.chapter_number}: {item.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {item.description?.slice(0, 120)}...
              </p>
              <Link
                href={`/student/dashboard/literacy/${item._id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Baca selengkapnya →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
