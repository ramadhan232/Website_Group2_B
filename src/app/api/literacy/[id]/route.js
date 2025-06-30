import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Literacy from '@/models/Literacy';

export async function GET(req, {params}) {
  const {id} = await params;

  await connectToDatabase();

  const literacy = await Literacy.findById(id);
  if (!literacy) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(literacy);
}
