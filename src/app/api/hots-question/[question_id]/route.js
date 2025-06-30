import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsQuestion from '@/models/HotsQuestion';

export async function GET(request, { params }) {
  const { question_id } =  await params;

  if (!question_id) {
    return NextResponse.json({ error: 'Missing question_id' }, { status: 400 });
  }

  await connectToDatabase();

  const question = await HotsQuestion.findOne({ question_id });

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json(question);
}
