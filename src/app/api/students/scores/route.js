import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Score from '@/models/Score';
import ScoreSummary from '@/models/ScoreSummary';

export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    console.log('role', token.role);

    // Ambil skor untuk user ini
    const scores = await Score.find({ student_id: token.id })
      .sort({ createdAt: -1 })
      .lean();

    // Ambil summary juga
    const summaries = await ScoreSummary.find({ student_id: token.id })
      .sort({ level: 1, chapter_number: 1 })
      .lean();

    return NextResponse.json({ scores, summaries });
  } catch (error) {
    console.error('❌ Error in /api/student/scores:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
