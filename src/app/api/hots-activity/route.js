import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import HotsActivity from '@/models/HotsActivity';


export async function GET() {
  await connectToDatabase();
  const activities = await HotsActivity.find({});
  return NextResponse.json(activities);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      student_id,
      question_id,
      activity_format,
      essay_response,
      matching_response,
    } = body;

    if (!student_id || !question_id || !activity_format) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      activity_format === 'essay' &&
      (!essay_response || typeof essay_response !== 'string')
    ) {
      return NextResponse.json({ error: 'Missing or invalid essay_response' }, { status: 400 });
    }

    if (
      activity_format === 'matching' &&
      (!Array.isArray(matching_response) || matching_response.length === 0)
    ) {
      return NextResponse.json({ error: 'Missing or invalid matching_response' }, { status: 400 });
    }

    await connectToDatabase();

    // Cegah double submission
    const alreadyExists = await HotsActivity.exists({ student_id, question_id });
    if (alreadyExists) {
      return NextResponse.json({ error: 'You have already answered this question' }, { status: 409 });
    }

    const newActivity = new HotsActivity({
      student_id,
      question_id,
      activity_format,
      essay_response,
      matching_response,
    });

    const saved = await newActivity.save();
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error('❌ Error saving HOTS activity:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
