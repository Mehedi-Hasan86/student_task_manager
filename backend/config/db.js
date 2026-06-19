const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri && process.env.USE_MEMORY_DB !== 'true') {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
      }
      console.warn(`Local MongoDB unavailable (${error.message})`);
      console.warn('Falling back to in-memory database for development...');
    }
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const conn = await mongoose.connect(mongod.getUri());
    console.log(`In-memory MongoDB connected (${conn.connection.host})`);
    console.log('Dev note: data resets when the server stops. Use MongoDB Atlas for persistence.');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
