import mongoose from 'mongoose';

export interface IStudentProfile extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  studentId: string;
  name: string;
  batch: string;
  rollNo: string;
  phone?: string;
  email?: string;
  photo?: string;
  examTarget: string;
  examDate?: Date;
  syllabus: { subject: string; pct: number }[];
  rank?: number;
  lastMockScore?: number;
  lastMockMax?: number;
}

const StudentProfileSchema = new mongoose.Schema<IStudentProfile>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  batch: { type: String, default: 'NEET Batch A1' },
  rollNo: { type: String },
  phone: String,
  email: String,
  photo: String,
  examTarget: { type: String, default: 'NEET 2027' },
  examDate: Date,
  syllabus: [{ subject: String, pct: Number }],
  rank: Number,
  lastMockScore: Number,
  lastMockMax: { type: Number, default: 720 },
}, { timestamps: true });

export default mongoose.models.StudentProfile || mongoose.model<IStudentProfile>('StudentProfile', StudentProfileSchema);
