import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role'); // Contoh: role=student

    await connectToDatabase();

    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password'); // Jangan kirim password

    return NextResponse.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
