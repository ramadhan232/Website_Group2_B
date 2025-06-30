// src/app/api/scores/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Score from '@/models/Score';
import HotsQuestion from '@/models/HotsQuestion';
import generateScoreSummary from '@/lib/generateScoreSummary';

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const student_id = searchParams.get('student_id');
    const chapter_number = searchParams.get('chapter_number');
    const question_id = searchParams.get('question_id');

    // 🔍 Filter dinamis
    const query = {};
    if (student_id) query.student_id = student_id;
    if (question_id) query.question_id = question_id;
    if (chapter_number) query.chapter_number = Number(chapter_number);

    const scores = await Score.find(query)
      .populate('student_id', 'name username') // jika ingin info siswa
      .populate('teacher_id', 'name username') // jika ingin info guru
      .sort({ createdAt: -1 });

    return NextResponse.json(scores);
  } catch (error) {
    console.error('❌ Error in GET /api/score:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { student_id, teacher_id, question_id, score, comment } = body;

    if (!student_id || !teacher_id || !question_id || score === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // ✅ Ambil chapter_number dari HotsQuestion
    const question = await HotsQuestion.findOne({ question_id });
    if (!question) {
      return NextResponse.json({ error: 'Invalid question_id' }, { status: 400 });
    }

    const chapter_number = question.chapter_number;

    // ✅ Simpan skor
    const newScore = await Score.create({
      student_id,
      teacher_id,
      question_id,
      chapter_number,
      score,
      comment,
    });

    // ✅ Auto generate ScoreSummary (per_question, per_chapter, total)
    await generateScoreSummary(student_id); // buat fungsi ini sesuai modelmu

    return NextResponse.json({ success: true, score: newScore });
  } catch (error) {
    console.error('❌ Error in POST /api/score:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}