import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import StudentProfile from '@/models/StudentProfile';

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI as string);
    }
    
    // Check if students already exist to prevent duplicate seeding
    const count = await User.countDocuments({ role: 'student' });
    if (count >= 60) {
      return NextResponse.json({ message: 'Database already seeded with students' });
    }

    // 60 students: 30 for JEE, 30 for NEET
    // 3 batches of 10 for each
    const batches = [
      { name: 'JEE Batch A', target: 'JEE 2026', max: 300, subjects: ['Physics', 'Chemistry', 'Maths'] },
      { name: 'JEE Batch B', target: 'JEE 2027', max: 300, subjects: ['Physics', 'Chemistry', 'Maths'] },
      { name: 'JEE Batch C', target: 'JEE 2026', max: 300, subjects: ['Physics', 'Chemistry', 'Maths'] },
      { name: 'NEET Batch A', target: 'NEET 2026', max: 720, subjects: ['Physics', 'Chemistry', 'Biology'] },
      { name: 'NEET Batch B', target: 'NEET 2027', max: 720, subjects: ['Physics', 'Chemistry', 'Biology'] },
      { name: 'NEET Batch C', target: 'NEET 2026', max: 720, subjects: ['Physics', 'Chemistry', 'Biology'] },
    ];

    const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Arjun', 'Siddharth', 'Rohan', 'Rahul', 'Ananya', 'Diya', 'Ishita', 'Priya', 'Sneha', 'Kavya', 'Neha', 'Riya', 'Avni', 'Aadhya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Patil', 'Joshi', 'Reddy', 'Singh', 'Kumar', 'Das', 'Iyer', 'Nair'];

    const hashedPassword = await bcrypt.hash('student123', 10);
    let studentCounter = 1;

    const newUsers = [];
    const newProfiles = [];

    for (const batch of batches) {
      for (let i = 0; i < 10; i++) {
        const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${fName} ${lName}`;
        const studentId = `STU${Math.floor(Date.now() / 1000) + studentCounter}`;
        const email = `${fName.toLowerCase()}.${studentId.toLowerCase()}@edumiracle.in`;

        const user = new User({
          studentId,
          email,
          password: hashedPassword,
          name: fullName,
          role: 'student',
          batch: batch.name,
        });

        const profile = new StudentProfile({
          userId: user._id,
          studentId,
          name: fullName,
          batch: batch.name,
          rollNo: studentId,
          email,
          phone: `9198${Math.floor(100000 + Math.random() * 900000)}`,
          examTarget: batch.target,
          syllabus: batch.subjects.map(s => ({ subject: s, pct: Math.floor(Math.random() * 100) })),
          rank: Math.floor(Math.random() * 500) + 1,
          lastMockScore: Math.floor(Math.random() * batch.max * 0.8) + (batch.max * 0.2), // Random score between 20% and 100%
          lastMockMax: batch.max,
        });

        newUsers.push(user);
        newProfiles.push(profile);
        studentCounter++;
      }
    }

    await User.insertMany(newUsers);
    await StudentProfile.insertMany(newProfiles);

    return NextResponse.json({ message: 'Successfully seeded 60 students in 6 batches', count: newUsers.length });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
