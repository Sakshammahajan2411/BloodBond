// src/models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: 'unread' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
