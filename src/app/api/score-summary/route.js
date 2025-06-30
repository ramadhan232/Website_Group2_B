import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import ScoreSummary from '@/models/ScoreSummary';

// GET /api/score-summary
export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('student_id');
    
    const filter = studentId ? { student_id: studentId } : {};

    const summaries = await ScoreSummary.find(filter);
    return NextResponse.json(summaries);
  } catch (err) {
    console.error('❌ Failed to fetch score summaries:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
