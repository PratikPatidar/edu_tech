import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { getAuthPayload } from '@/lib/auth';
import AttendanceRecord from '@/models/AttendanceRecord';

export async function GET(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const year = parseInt(url.searchParams.get('year') ?? String(new Date().getFullYear()));
  const month = parseInt(url.searchParams.get('month') ?? String(new Date().getMonth() + 1));

  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);
  const record = await AttendanceRecord.findOne({ userId, year, month }).lean() as any;

  if (!record) {
    return NextResponse.json({
      success: true,
      year,
      month,
      offset: 0,
      days: [],
      monthLabel: new Date(year, month - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
    });
  }

  const days = record.days as any[];
  const weekends = days.filter((d: any) => d.status === 'weekend').length;
  const holidays = days.filter((d: any) => d.status === 'holiday').length;
  const present = days.filter((d: any) => d.status === 'present').length;
  const half = days.filter((d: any) => d.status === 'half').length;
  const absent = days.filter((d: any) => d.status === 'absent').length;
  const working = days.length - weekends - holidays;
  const pct = working > 0 ? Math.round(((present + half * 0.5) / working) * 100) : 0;

  return NextResponse.json({
    success: true,
    year,
    month,
    offset: record.offset,
    monthLabel: new Date(year, month - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
    stats: { working, present, absent, half, holidays, weekends, pct },
    days: record.days,
  });
}
