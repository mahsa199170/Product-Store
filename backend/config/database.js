const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error('DATABASE_URI is missing in .env file');
    }
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('connected to db');
  } catch (error) {
    console.log(error.message);
    process.exit(1); // 1 means exist with failure, o means success
  }
};

module.exports = connectDB;
