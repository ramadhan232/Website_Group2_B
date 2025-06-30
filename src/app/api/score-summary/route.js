import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import ScoreSummary from '@/models/ScoreSummary';

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const student_id = searchParams.get('student_id');
    const chapter_number = searchParams.get('chapter');

    const query = {};
    if (student_id) query.student_id = student_id;
    if (chapter_number) query.chapter_number = Number(chapter_number);

    const summaries = await ScoreSummary.find(query)
      .populate('student_id', 'name username')
      .sort({ 'student_id.name': 1, chapter_number: 1 });

    return NextResponse.json(summaries);
  } catch (error) {
    console.error('❌ Error in GET /api/score-summary:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
