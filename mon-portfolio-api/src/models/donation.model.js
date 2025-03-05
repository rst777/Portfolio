// src/models/donation.model.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationCampaign', required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
