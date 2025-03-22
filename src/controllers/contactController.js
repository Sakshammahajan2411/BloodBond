const ContactModel = require('../models/contact'); // Use Mongoose model

class ContactController {
  constructor() {
    this.contactModel = ContactModel; // Use Mongoose Model
  }

  // Create a new contact message
  async createContactMessage(req, res) {
    try {
      const messageData = req.body;
      const newMessage = new this.contactModel({
        ...messageData,
        status: 'unread',
      });
      const result = await newMessage.save();
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all contact messages
  async getAllContactMessages(req, res) {
    try {
      const messages = await this.contactModel.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      console.error('Error getting all contact messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get contact message by ID
  async getContactMessageById(req, res) {
    try {
      const message = await this.contactModel.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(message);
    } catch (error) {
      console.error('Error getting contact message by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update contact message status
  async updateContactMessageStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await this.contactModel.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(result);
    } catch (error) {
      console.error('Error updating contact message status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete contact message
  async deleteContactMessage(req, res) {
    try {
      const result = await this.contactModel.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ContactController;
