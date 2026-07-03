const mongoose = require('mongoose');

const uri = 'mongodb+srv://nakme12:Mmmmmm%401@cluster0.dm381gp.mongodb.net/edumiracle?retryWrites=true&w=majority&appName=Cluster0';

async function listCols() {
  console.log('Connecting to database...');
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('Listing collections:');
  const cols = await db.listCollections().toArray();
  for (const c of cols) {
    console.log('-', c.name);
  }
  
  mongoose.disconnect();
}

listCols();
