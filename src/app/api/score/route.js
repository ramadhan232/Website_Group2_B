import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Score from '@/models/Score';

export async function GET() {
  await connectToDatabase();
  const scores = await Score.find({});
  return NextResponse.json(scores);
}

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  const created = await Score.create(body);
  return NextResponse.json(created);
}
