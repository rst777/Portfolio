// src/models/donation.model.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationCampaign', required: true },
  amount: { type: Number, required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Donation', donationSchema);
