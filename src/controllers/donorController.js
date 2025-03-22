
const DonorModel = require('../models/donor');

class DonorController {
  constructor() {
    this.donorModel = DonorModel;
  }

  // 🚀 Method to create a donor
  async createDonor(req, res) {
    console.log('📥 Incoming Request Data:', req.body);

    try {
      const donorData = req.body;
      const newDonor = new this.donorModel(donorData);

      console.log('💾 Attempting to save to MongoDB...');
      const result = await newDonor.save();
      
      console.log('✅ Save Result:', result);
      res.status(201).json(result);
    } catch (error) {
      console.error('❌ Error creating donor:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }

  // ✅ Add the missing `getAllDonors` function
  async getAllDonors(req, res) {
    try {
      console.log('🔍 Fetching all donors from MongoDB...');
      const donors = await this.donorModel.find();
      
      console.log(`✅ Retrieved ${donors.length} donors.`);
      res.status(200).json(donors);
    } catch (error) {
      console.error('❌ Error fetching donors:', error);
      res.status(500).json({ error: 'Failed to retrieve donors', details: error.message });
    }
  }
}

module.exports = DonorController;
