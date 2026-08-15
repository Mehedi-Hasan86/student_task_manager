/**
 * Database connection utility.
 *
 * Connects to MongoDB using MONGODB_URI from the environment. If no URI
 * is configured (or USE_MEMORY_DB=true), it falls back to an in-memory
 * MongoDB for local development — handy when MongoDB isn't installed.
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // Preferred path: real MongoDB (Atlas or local), unless dev mode
  // explicitly requests the in-memory database.
  if (uri && process.env.USE_MEMORY_DB !== 'true') {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      // In production a missing database is fatal — fail fast.
      if (process.env.NODE_ENV === 'production') {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
      }
      console.warn(`Local MongoDB unavailable (${error.message})`);
      console.warn('Falling back to in-memory database for development...');
    }
  }

  // Development fallback: in-memory MongoDB server.
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