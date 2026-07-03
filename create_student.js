const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://nakme12:Mmmmmm%401@cluster0.dm381gp.mongodb.net/edumiracle?retryWrites=true&w=majority&appName=Cluster0'; 

async function createDummyStudent() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  // check if a student exists
  const existing = await db.collection('users').findOne({ role: 'student' });
  if (existing) {
    console.log('Existing student ID:', existing.studentId);
    // Let's reset their password so we know what it is
    const hashed = await bcrypt.hash('Student@123', 10);
    await db.collection('users').updateOne({ _id: existing._id }, { $set: { password: hashed } });
    console.log('Password reset to: Student@123');
  } else {
    // create one
    const hashed = await bcrypt.hash('Student@123', 10);
    await db.collection('users').insertOne({
      name: 'Test Student',
      studentId: 'STU2026001',
      password: hashed,
      role: 'student',
      batch: 'Target Batch',
      createdAt: new Date()
    });
    console.log('Created new student. ID: STU2026001, Pass: Student@123');
  }
  mongoose.disconnect();
}

createDummyStudent();
