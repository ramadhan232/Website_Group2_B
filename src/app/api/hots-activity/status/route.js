import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';
import HotsQuestion from '@/models/HotsQuestion';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const student_id = searchParams.get('student_id');
    const chapter = Number(searchParams.get('chapter'));

    if (!student_id || !chapter) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await connectToDatabase();

    const questions = await HotsQuestion.find({ chapter_number: chapter });
    const questionIds = questions.map((q) => q.question_id);

    const answered = await HotsActivity.find({
      student_id: new mongoose.Types.ObjectId(student_id),
      question_id: { $in: questionIds },
    });

    const statusMap = Object.fromEntries(
      questionIds.map((id) => [id, answered.some((ans) => ans.question_id === id)])
    );

    return NextResponse.json(statusMap);
  } catch (err) {
    console.error('🔥 Error in /api/hots-activity/status:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
