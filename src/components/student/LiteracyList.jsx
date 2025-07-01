'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/styles/globals.css';

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
    <div className="grid grid-col gap-y-8 max-w-5xl mx-auto pt-8">
      <h1 className=" justify-center text-center text-2xl font-bold p-4 text-blue-700">Literacy material</h1>

      {loading ? (
        <p className="text-gray-500">Loading Material...</p>
      ) : chapters.length === 0 ? (
        <p className="text-gray-500">Belum ada materi literacy tersedia.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {chapters.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow border hover:shadow-md">
              <h2 className="text-lg font-semibold text-blue-800 mb-1">
                Chapter {item.chapter_number}: {item.title}
              </h2>
              <div className='flex max-w-full justify-center'>
              {item.media?.images?.[0] && (
                <img
                  src={item.media.images[0]}
                  alt={`Ilustrasi ${item.title}`}
                  className=" w-40 h-40 object-cover rounded mb-4"
                />
              )}</div>
              <p className="text-sm text-gray-600 mb-2">
                {item.genre}...
              </p>
              <Link
                href={`/student/dashboard/literacy/${item._id}`}
                className="text-sm text-blue-600 hover:underline"
              ><p className="text-sm text-blue-600 hover:underline">Baca selengkapnya →</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
