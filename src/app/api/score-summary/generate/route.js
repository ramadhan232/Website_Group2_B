import { NextResponse } from 'next/server';
import { generateScoreSummary } from '@/lib/generateScoreSummary';
import { getServerSession } from 'next-auth';
import { requireRole } from '@/lib/checkRole'; // opsional

export async function POST(req) {
  const session = await getServerSession();

  // Opsional: hanya guru bisa trigger
  if (!session || session.user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('student_id');

  if (!studentId) {
    return NextResponse.json({ error: 'Missing student_id' }, { status: 400 });
  }

  try {
    const result = await generateScoreSummary(studentId);
    return NextResponse.json({ message: 'Summary generated', ...result });
  } catch (err) {
    console.error('Summary generation failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
