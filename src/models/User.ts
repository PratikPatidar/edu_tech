import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  studentId?: string; // e.g. "STU2026001"
  email?: string;
  password?: string;
  name: string;
  role: 'admin' | 'student' | 'educator';
  batch?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'educator'],
    default: 'student',
    required: true,
  },
  batch: {
    type: String,
  }
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
