// src/routes/contactRoutes.js
const express = require('express');

function createContactRouter(contactController) {
  const router = express.Router();

  // Create a new contact message
  router.post('/', (req, res) => contactController.createContactMessage(req, res));

  // Get all contact messages (admin function)
  router.get('/', (req, res) => contactController.getAllContactMessages(req, res));

  // Get contact message by ID (admin function)
  router.get('/:id', (req, res) => contactController.getContactMessageById(req, res));

  // Update contact message status (admin function)
  router.put('/:id/status', (req, res) => contactController.updateContactMessageStatus(req, res));

  // Delete contact message (admin function)
  router.delete('/:id', (req, res) => contactController.deleteContactMessage(req, res));

  return router;
}

module.exports = createContactRouter;