import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { getAuthPayload } from '@/lib/auth';
import Material from '@/models/Material';
import StudentProfile from '@/models/StudentProfile';
import User from '@/models/User';

const DEFAULT_MATERIALS = [
  { subject: 'Physics', type: 'video', title: 'Rotational Dynamics – Lecture 4', desc: 'Moment of inertia derivations + 10 PYQs solved live.', color: 'fuchsia' },
  { subject: 'Chemistry', type: 'pdf', title: 'Organic Chemistry Master Sheet', desc: 'Reaction mechanisms, name reactions & tricks for NEET.', color: 'blue' },
  { subject: 'Biology', type: 'pdf', title: 'Human Physiology – NCERT Points', desc: 'High-yield extracted notes for last-minute revision.', color: 'green' },
  { subject: 'Physics', type: 'pdf', title: 'Electrostatics PYQ Bank', desc: 'Last 10 years questions with step-by-step solutions.', color: 'fuchsia' },
  { subject: 'Chemistry', type: 'video', title: 'Chemical Bonding – Lecture 2', desc: 'VSEPR theory, hybridization and MOT explained.', color: 'blue' },
  { subject: 'Biology', type: 'video', title: 'Plant Kingdom – Complete', desc: 'Full chapter coverage with NCERT diagrams animated.', color: 'green' },
];

export async function GET(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);
  const user = await User.findById(userId).lean() as any;
  const profile = await StudentProfile.findOne({ userId }).lean() as any;
  const batch = user?.batch || profile?.batch || 'NEET A1';

  let materials = await Material.find({ batch }).lean();

  if (materials.length === 0) {
    // Seed default materials for this batch
    const docs = DEFAULT_MATERIALS.map(m => ({ ...m, batch }));
    await Material.insertMany(docs);
    materials = await Material.find({ batch }).lean();
  }

  return NextResponse.json({
    success: true,
    materials: materials.map(m => ({
      _id: String(m._id),
      subject: m.subject,
      type: m.type,
      title: m.title,
      desc: m.desc,
      color: m.color,
    })),
  });
}
