import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  type: { type: String, enum: ['video', 'pdf'], required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  color: { type: String, default: 'fuchsia' },
  batch: { type: String, required: true },
  url: { type: String }
}, { timestamps: true });

export default mongoose.models.Material || mongoose.model('Material', MaterialSchema);
