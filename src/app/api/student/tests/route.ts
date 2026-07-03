import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { getAuthPayload } from '@/lib/auth';
import MockTest from '@/models/MockTest';

export async function GET(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);
  const tests = await MockTest.find({ userId })
    .sort({ date: -1 })
    .lean() as any[];

  const completed = tests.filter((t: any) => t.status === 'completed');
  const upcoming  = tests.filter((t: any) => t.status === 'upcoming');

  const bestScore = completed.length
    ? Math.max(...completed.map((t: any) => t.scored))
    : null;
  const bestRank = completed.length
    ? Math.min(...completed.filter((t: any) => t.rank).map((t: any) => t.rank))
    : null;
  const avgScore = completed.length
    ? Math.round(completed.reduce((acc: number, t: any) => acc + t.scored, 0) / completed.length)
    : null;

  return NextResponse.json({
    success: true,
    stats: {
      testsTaken: completed.length,
      bestScore,
      bestRank,
      avgScore,
    },
    upcoming: upcoming.map((t: any) => ({
      _id: String(t._id),
      testName: t.testName,
      testType: t.testType,
      date: new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalMarks: t.totalMarks,
    })),
    completed: completed.map((t: any) => ({
      _id: String(t._id),
      testName: t.testName,
      testType: t.testType,
      date: new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      scored: t.scored,
      totalMarks: t.totalMarks,
      rank: t.rank,
      percentile: t.rank ? parseFloat((100 - (t.rank / 200000) * 100).toFixed(1)) : null,
      subjects: t.subjects,
    })),
  });
}
