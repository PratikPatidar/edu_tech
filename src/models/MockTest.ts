import mongoose from 'mongoose';

export interface IMockTest extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  testName: string;
  testType: 'Minor' | 'Major' | 'Practice' | 'AITS';
  date: Date;
  totalMarks: number;
  scored: number;
  rank?: number;
  subjects: { name: string; correct: number; wrong: number; total: number }[];
  status: 'upcoming' | 'completed' | 'missed';
}

const MockTestSchema = new mongoose.Schema<IMockTest>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testName: String,
  testType: { type: String, enum: ['Minor', 'Major', 'Practice', 'AITS'] },
  date: Date,
  totalMarks: Number,
  scored: Number,
  rank: Number,
  subjects: [{ name: String, correct: Number, wrong: Number, total: Number }],
  status: { type: String, enum: ['upcoming', 'completed', 'missed'], default: 'upcoming' },
}, { timestamps: true });

export default mongoose.models.MockTest || mongoose.model<IMockTest>('MockTest', MockTestSchema);
