import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Literacy from '@/models/Literacy';

export async function GET() {
  await connectToDatabase();
  const literacies = await Literacy.find({});
  return NextResponse.json(literacies);
}


