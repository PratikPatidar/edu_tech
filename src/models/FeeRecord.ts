import mongoose from 'mongoose';

export interface IFeeRecord extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  totalFee: number;
  batch: string;
  academicYear: string;
  installments: {
    id: string;
    description: string;
    amount: number;
    dueDate: Date;
    paidDate?: Date;
    method?: string;
    receiptNo?: string;
    status: 'paid' | 'due' | 'upcoming';
  }[];
}

const FeeRecordSchema = new mongoose.Schema<IFeeRecord>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalFee: Number,
  batch: String,
  academicYear: String,
  installments: [{
    id: String,
    description: String,
    amount: Number,
    dueDate: Date,
    paidDate: Date,
    method: String,
    receiptNo: String,
    status: { type: String, enum: ['paid', 'due', 'upcoming'], default: 'upcoming' },
  }],
}, { timestamps: true });

export default mongoose.models.FeeRecord || mongoose.model<IFeeRecord>('FeeRecord', FeeRecordSchema);
