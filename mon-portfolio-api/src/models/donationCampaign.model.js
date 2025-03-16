// src/models/donationCampaign.model.js

const mongoose = require('mongoose');

const donationCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: {
    type: Number,
    required: true,
    min: [0, 'Le montant cible ne peut pas être négatif']
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Le montant collecté ne peut pas être négatif']
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Validation pour s'assurer que la date de fin est postérieure à la date de début
donationCampaignSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('La date de fin doit être postérieure à la date de début'));
  } else {
    next();
  }
});

// Méthode pour ajouter un don
donationCampaignSchema.methods.addDonation = function(amount) {
  this.raisedAmount += amount;
  return this.save();
};

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);

module.exports = DonationCampaign;
