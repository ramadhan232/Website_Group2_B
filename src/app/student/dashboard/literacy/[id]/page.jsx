import { notFound } from 'next/navigation';
import Link from 'next/link';
import LiteracyList from '@/components/student/LiteracyList';

export async function generateMetadata({ params }) {
  const { id } = await params
  return {
    title: `Literacy Chapter ${id}`,
  };
}

async function getLiteracyById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/literacy/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function LiteracyDetailPage({ params }) {
  const { id } = await params;
  const literacy = await getLiteracyById(id);

  if (!literacy) return notFound();

  return (
    <div className='flex w-full justify-center'>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-2">
        📘 Chapter {literacy.chapter_number}: {literacy.title}
      </h1>

      {literacy.description && (
        <p className="text-gray-600 mb-4 italic">{literacy.description}</p>
      )}

      {literacy.media?.images?.[0] && (
        <img
          src={literacy.media.images[0]}
          alt={`Ilustrasi ${literacy.title}`}
          className="w-full max-h-96 object-cover rounded mb-4"
        />
      )}

      <div className="prose prose-sm max-w-none text-justify mb-6">
        {Array.isArray(literacy.text_content)
          ? literacy.text_content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          : String(literacy.text_content)
              .split('\n')
              .filter((p) => p.trim() !== '')
              .map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
      </div>

      <Link
        href={`/student/dashboard/hots/chapter/${literacy.chapter_number}`}
        className="text-blue-600 hover:underline text-sm"
      >
        🔥 Kerjakan HOTS Bab {literacy.chapter_number} →
      </Link>
    </div>
    </div>
  );
}
