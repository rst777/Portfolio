// models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  raisedAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  startDate: Date,
  endDate: Date,
  creatorName: String,
});

const campaign = mongoose.model('campaign', campaignSchema);

module.exports = campaign;
