    

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';
import HotsQuestion from '@/models/HotsQuestion';
import User from '@/models/User';
import Score from '@/models/Score';

export async function GET(request) {
  await connectToDatabase();

  const allScores = await Score.find({}).lean();
  const scoredSet = new Set(allScores.map((s) => `${s.student_id}-${s.question_id}`));

  const rawActivities = await HotsActivity.find({})
    .populate('student_id', 'name username')
    .lean();

  const questions = await HotsQuestion.find({}).lean();
  const questionMap = Object.fromEntries(questions.map((q) => [q.question_id, q]));

  const unscored = rawActivities
    .filter((a) => !scoredSet.has(`${a.student_id.toString()}-${a.question_id}`))
    .map((a) => ({
      ...a,
      question: questionMap[a.question_id],
    }));

  return NextResponse.json(unscored);
}

