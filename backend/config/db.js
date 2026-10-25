const mongoose = require('mongoose');

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add your MongoDB Atlas connection string to backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  });

  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectDB;
