import mongoose from 'mongoose';

export interface IAttendanceDay {
  day: number;
  status: 'present' | 'absent' | 'half' | 'holiday' | 'weekend' | 'future';
  checkIn?: string;
  checkOut?: string;
  late?: string;
  test?: {
    name: string;
    syllabus: string;
    time: string;
    score?: string;
  };
}

export interface IAttendanceRecord extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  year: number;
  month: number; // 1-12
  offset: number; // day-of-week of the 1st (0=Sun,1=Mon...)
  days: IAttendanceDay[];
}

const AttendanceRecordSchema = new mongoose.Schema<IAttendanceRecord>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  year: Number,
  month: Number,
  offset: Number,
  days: [{
    day: Number,
    status: { type: String, enum: ['present', 'absent', 'half', 'holiday', 'weekend', 'future'] },
    checkIn: String,
    checkOut: String,
    late: String,
    test: {
      name: String,
      syllabus: String,
      time: String,
      score: String,
    },
  }],
}, { timestamps: true });

AttendanceRecordSchema.index({ userId: 1, year: 1, month: 1 }, { unique: true });

export default mongoose.models.AttendanceRecord || mongoose.model<IAttendanceRecord>('AttendanceRecord', AttendanceRecordSchema);
