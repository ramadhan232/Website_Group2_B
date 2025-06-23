import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req) {
  await connectToDatabase();

  let body;
  try {
    body = await req.json();
    console.log("🔥 Incoming Body:", body);
  } catch (err) {
    console.error("❌ Failed to parse JSON", err);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { username, name, password, role } = body;

  if (!username || !name || !password || !role) {
    console.log("❗ Missing fields:", { username, name, password, role });
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'Username already exists.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
}
