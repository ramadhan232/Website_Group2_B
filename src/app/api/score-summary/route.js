import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import ScoreSummary from '@/models/ScoreSummary';

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const student_id = searchParams.get('student_id');
  const chapter = searchParams.get('chapter');
  const level = searchParams.get('level'); // optional: 'per_chapter', 'total', etc.

  const filter = {};
  if (student_id) filter.student_id = student_id;
  if (chapter) filter.chapter_number = Number(chapter);
  if (level) filter.level = level;

  const data = await ScoreSummary.find(filter);
  return NextResponse.json(data);
}
