import { NextResponse } from 'next/server'; 
import connectToDatabase from '@/lib/mongoose';
import HotsQuestion from '@/models/HotsQuestion';

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const chapter = searchParams.get('chapter');

  let filter = {};
  if (chapter) {
    filter.chapter_number = Number(chapter); // pastikan numeric
  }

  const questions = await HotsQuestion.find(filter);
  return NextResponse.json(questions);
}
