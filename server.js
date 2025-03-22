
// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const { connectToDatabase } = require('./src/config/database');
const DonorController = require('./src/controllers/donorController');
const createDonorRouter = require('./src/routes/donorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ Middleware
app.use(cors({
  origin: 'https://bloodbond-r6ty.onrender.com',   // ✅ Allow access from any origin (change this in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Connection
async function startServer() {
  if (!MONGODB_URI) {
    console.error('❌ MongoDB URI is missing. Check your .env file.');
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to MongoDB...');
    await connectToDatabase(MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');

    setupRoutes();
    
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// ✅ Route Setup
function setupRoutes() {
  const donorController = new DonorController();
  const donorRouter = createDonorRouter(donorController);

  console.log('🔗 Registering routes...');
  app.use('/api/donors', donorRouter);
  console.log('✅ Donor route registered: /api/donors');

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'BloodBond API is running' });
  });

  console.log('✅ All routes registered successfully');
}

// Start the server
startServer();
