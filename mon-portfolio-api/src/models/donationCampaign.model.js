// src/models/donationCampaign.model.js

const mongoose = require('mongoose');

const donationCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true, min: 0 },
  raisedAmount: { type: Number, default: 0, min: 0 },
  endDate: { type: Date, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);

module.exports = DonationCampaign;
