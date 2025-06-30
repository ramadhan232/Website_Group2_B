import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';
import User from '@/models/User';
import HotsQuestion from '@/models/HotsQuestion';

export async function GET() {
  await connectToDatabase();

  const activities = await HotsActivity.find({})
    .populate('student_id', 'username name')
    .lean();

  const questions = await HotsQuestion.find({}).lean();
  const questionMap = Object.fromEntries(
    questions.map(q => [q.question_id, q])
  );

  const enriched = activities.map(act => ({
    ...act,
    question: questionMap[act.question_id] || null
  }));

  return NextResponse.json(enriched);
}
