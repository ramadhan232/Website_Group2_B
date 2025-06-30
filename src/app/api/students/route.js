// /api/students/route.js
import User from "@/models/User";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const students = await User.find({ role: "student" }, "_id name");
  return NextResponse.json(students);
}
