import mongoose from 'mongoose';

export interface INotice extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  urgent: boolean;
  targetBatches: string[]; // e.g. ['NEET A1', 'ALL']
}

const NoticeSchema = new mongoose.Schema<INotice>({
  title: String,
  description: String,
  date: Date,
  urgent: { type: Boolean, default: false },
  targetBatches: [String],
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
