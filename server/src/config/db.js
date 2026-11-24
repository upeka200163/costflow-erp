const mongoose = require('mongoose');
const { setMongoConnected } = require('./dbAdapter');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri && mongoUri.trim() !== '') {
    try {
      console.log('Connecting to MongoDB via URI (Atlas / Remote)...');
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(` MongoDB Atlas Connected: ${conn.connection.host}`);
      setMongoConnected(true);
      return;
    } catch (err) {
      console.warn('⚠️ Warning: Failed to connect to MONGODB_URI:', err.message);
      console.log('Falling back to internal in-memory data store...');
    }
  }

  // Attempt to connect to local MongoDB if available
  try {
    const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/costflow', {
      serverSelectionTimeoutMS: 1500,
    });
    console.log(` Connected to local MongoDB: ${localConn.connection.host}`);
    setMongoConnected(true);
    return;
  } catch (localErr) {
    // Local MongoDB not running - use robust in-memory database store
    console.log('ℹ️  Running in standalone demo mode with in-memory persistence.');
    console.log('💡 Note: Set MONGODB_URI in environment variables to connect to MongoDB Atlas in production.');
    setMongoConnected(false);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {}
  setMongoConnected(false);
};

module.exports = { connectDB, disconnectDB };
