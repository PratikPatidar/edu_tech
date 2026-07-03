import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectToDatabase();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already initialized' });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new User({
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'admin',
    });

    await admin.save();

    return NextResponse.json({ message: 'Admin successfully created', email: adminEmail });

  } catch (error: any) {
    console.error("Initialization Error:", error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
