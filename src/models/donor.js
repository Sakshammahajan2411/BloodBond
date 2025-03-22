// src/models/donor.js
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  age: Number,
  location: String,
  phone: String,
  email: String,
  consent: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;