const express = require('express');
const router = express.Router();

module.exports = (donorController) => {
  // ✅ Create a new donor
  router.post('/', (req, res) => donorController.createDonor(req, res));

  // ✅ Retrieve all donors
  router.get('/', (req, res) => donorController.getAllDonors(req, res));

  return router;
};