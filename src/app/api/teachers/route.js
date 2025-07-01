import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  await connectToDatabase();

  const teachers = await User.find({ role: 'teacher' }).select('name username role');
  return NextResponse.json(teachers);
}
