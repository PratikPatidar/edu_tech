import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  program: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, program, message } = body;
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    await connectToDatabase();
    await Inquiry.create({ name, email, phone, program, message });
    try {
      const { sendEmail } = await import('@/lib/email');
      await sendEmail(
        'admissions@edumiracle.in',
        `New Inquiry from ${name}`,
        `<h2>New Website Inquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'Not provided'}</p><p><strong>Program:</strong> ${program || 'Not specified'}</p><p><strong>Message:</strong> ${message}</p>`
      );
    } catch (emailErr) {
      console.warn('Email send failed:', emailErr);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
