import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, batch, password } = await req.json();
    await connectToDatabase();

    // Generate a unique Student ID (e.g., STU + Year + Random 4 digits)
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const studentId = `STU${year}${randomNum}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      studentId,
      password: hashedPassword,
      name,
      role: 'student',
      batch,
    });

    await newStudent.save();

    return NextResponse.json({ 
      success: true, 
      studentId: studentId,
      message: 'Student registered successfully'
    });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: 'Failed to register student' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, students });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
