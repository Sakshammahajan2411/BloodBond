const mongoose = require('mongoose');

// MongoDB Connection Function
const connectToDatabase = async (uri) => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = { connectToDatabase };