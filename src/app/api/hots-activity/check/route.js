import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const student_id = searchParams.get('student_id');
    const question_id = searchParams.get('question_id');

    if (!student_id || !question_id) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // ✅ Validasi ObjectId
    if (!mongoose.Types.ObjectId.isValid(student_id)) {
      return NextResponse.json({ error: 'Invalid student_id' }, { status: 400 });
    }

    await connectToDatabase();

    const exists = await HotsActivity.exists({
      student_id: new mongoose.Types.ObjectId(student_id),
      question_id,
    });

    return NextResponse.json({ exists: !!exists });
  } catch (err) {
    console.error('🔥 Error in /api/hots-activity/check:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
