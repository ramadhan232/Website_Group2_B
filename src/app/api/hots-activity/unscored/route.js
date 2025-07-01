import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';
import Score from '@/models/Score';
import HotsQuestion from '@/models/HotsQuestion';

export async function GET() {
  try {
    await connectToDatabase();

    // Ambil hanya aktivitas yang belum dinilai
    const activities = await HotsActivity.find({ is_reviewed: false })
      .populate('student_id', 'name username')
      .lean();

    // Ambil semua skor terkait untuk filter manual (optional jika query langsung tidak mencukupi)
    const scoredMap = {};
    const scored = await Score.find({});
    scored.forEach((s) => {
      scoredMap[`${s.student_id}_${s.question_id}`] = true;
    });

    // Filter: hanya activity yang belum punya skor
    const unscoredActivities = activities.filter(
      (a) => !scoredMap[`${a.student_id._id}_${a.question_id}`]
    );

    // Populate question manually (karena question_id bukan ObjectId)
    const questionIds = [...new Set(unscoredActivities.map((a) => a.question_id))];
    const questions = await HotsQuestion.find({ question_id: { $in: questionIds } }).lean();
    const questionMap = Object.fromEntries(questions.map((q) => [q.question_id, q]));

    const withQuestion = unscoredActivities.map((a) => ({
      ...a,
      question: questionMap[a.question_id] || null,
    }));

    return NextResponse.json(withQuestion);
  } catch (err) {
    console.error('❌ Error fetching unscored activities:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
