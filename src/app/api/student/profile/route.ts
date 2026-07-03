import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { getAuthPayload } from '@/lib/auth';
import StudentProfile from '@/models/StudentProfile';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);
  const user = await User.findById(userId).select('-password').lean() as any;
  const profile = await StudentProfile.findOne({ userId }).lean() as any;

  return NextResponse.json({
    success: true,
    profile: {
      name: user?.name ?? payload.name,
      studentId: user?.studentId ?? '',
      email: user?.email ?? profile?.email ?? '',
      phone: profile?.phone ?? '',
      batch: user?.batch ?? profile?.batch ?? '',
      examTarget: profile?.examTarget ?? 'NEET 2027',
    },
  });
}

export async function PATCH(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);

  // Update profile fields
  const { name, phone, email, currentPassword, newPassword } = body;

  // Handle password change
  if (currentPassword && newPassword) {
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, user.password!);
    if (!isMatch) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

    user.password = await bcrypt.hash(newPassword, 10);
    if (name) user.name = name;
    await user.save();
  } else {
    // Update name on User model
    if (name) await User.findByIdAndUpdate(userId, { name });
  }

  // Update extended profile fields
  await StudentProfile.findOneAndUpdate(
    { userId },
    { phone, email },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true, message: 'Profile updated successfully' });
}
