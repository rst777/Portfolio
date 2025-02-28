// src/models/donationCampaign.model.js
const mongoose = require('mongoose');

const donationCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
});

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);

module.exports = DonationCampaign;
