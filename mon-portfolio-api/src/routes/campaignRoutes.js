// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

// Exemple de route pour créer une nouvelle campagne
router.post('/campaigns', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
