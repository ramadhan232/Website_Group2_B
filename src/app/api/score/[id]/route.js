// src/app/api/scores/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Score from '@/models/Score';

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  await connectToDatabase();

  const updated = await Score.findByIdAndUpdate(id, {
    $set: {
      score: body.score,
      comment: body.comment,
    },
  }, { new: true });

  return NextResponse.json(updated);
}
