import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';
import StudentProfile from '@/models/StudentProfile';
import MockTest from '@/models/MockTest';

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI as string);
    }

    const studentsCount = await User.countDocuments({ role: 'student' });
    const batchesCount = (await StudentProfile.distinct('batch')).length;
    const testsCount = await MockTest.countDocuments();
    
    // Calculate average score dynamically from seeded data
    const avgScoreResult = await StudentProfile.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$lastMockScore' } } }
    ]);
    const avgScore = avgScoreResult[0] ? Math.round(avgScoreResult[0].avgScore) : 0;

    return NextResponse.json({
      success: true,
      studentsCount,
      batchesCount,
      testsCount,
      avgScore,
    });
  } catch (error: any) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
