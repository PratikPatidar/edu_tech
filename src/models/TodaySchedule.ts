import mongoose from 'mongoose';

export interface ITodaySchedule extends mongoose.Document {
  batch: string;
  date: Date;
  classes: { time: string; subject: string; teacher: string; room: string }[];
  facultyLeave: { name: string; role: string; initials: string; badge: string; backDate?: string }[];
}

const TodayScheduleSchema = new mongoose.Schema<ITodaySchedule>({
  batch: String,
  date: Date,
  classes: [{ time: String, subject: String, teacher: String, room: String }],
  facultyLeave: [{ name: String, role: String, initials: String, badge: String, backDate: String }],
}, { timestamps: true });

export default mongoose.models.TodaySchedule || mongoose.model<ITodaySchedule>('TodaySchedule', TodayScheduleSchema);
