const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const contactSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  preferredCommunication: {
    type: String,
    enum: ['email', 'phone', 'post'],
    default: 'email'
  },
  donationHistory: [{
    amount: Number,
    date: { type: Date, default: Date.now },
    campaign: String
  }],
  totalDonated: {
    type: Number,
    default: 0
  },
  lastDonationDate: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Middleware pour hacher le mot de passe avant l'enregistrement
contactSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = Date.now();
  next();
});

// Méthode pour comparer les mots de passe
contactSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour ajouter un don
contactSchema.methods.addDonation = function(amount, campaign) {
  this.donationHistory.push({ amount, campaign });
  this.totalDonated += amount;
  this.lastDonationDate = Date.now();
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
