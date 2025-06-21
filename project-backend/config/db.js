const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    console.log('Collections:', await conn.connection.db.listCollections().toArray());
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('\nTroubleshooting Tips:');
    console.log('1. Is MongoDB running? (Run "mongod --version")');
    console.log('2. Check your .env MONGODB_URI');
    console.log('3. Try direct connection: mongosh "mongodb://127.0.0.1:27017/ecommerce"');
    process.exit(1);
  }
};

module.exports = connectDB;