// src/controllers/donationController.js

const Donation = require('../models/donation.model');
const DonationCampaign = require('../models/donationCampaign.model');

// Récupère toutes les donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('campaign', 'title');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des donations',
      error: err.message
    });
  }
};
// Cette fonction récupère toutes les donations enregistrées.

// Fait une nouvelle donation
exports.makeDonation = async (req, res) => {
  const { campaignId, amount, donorName, donorEmail } = req.body;
  console.log('Tentative de don:', { campaignId, amount, donorName, donorEmail });

  // Convertir le montant en nombre et vérifier sa validité
  const donationAmount = parseFloat(amount);
  if (isNaN(donationAmount) || donationAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Le montant du don doit être un nombre positif et supérieur à zéro.',
    });
  }

  try {
    const campaign = await DonationCampaign.findById(campaignId);
    console.log('Campagne trouvée:', campaign);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée. Assurez-vous que l\'ID de la campagne est correct.',
      });
    }

    const donation = new Donation({ amount: donationAmount, campaign: campaignId, donorName, donorEmail });
    await donation.save();

    // Additionner correctement les montants
    campaign.raisedAmount = parseFloat(campaign.raisedAmount) + donationAmount;
    console.log('Nouveau montant collecté:', campaign.raisedAmount);
    await campaign.save();
    console.log('Campagne mise à jour avec succès');

    // Vérifier que la mise à jour a bien été effectuée
    const updatedCampaign = await DonationCampaign.findById(campaignId);
    console.log('Montant final vérifié:', updatedCampaign.raisedAmount);

    res.status(201).json({
      success: true,
      message: 'Don effectué avec succès.',
      donation: donation,
      updatedRaisedAmount: updatedCampaign.raisedAmount
    });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du don:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur, veuillez réessayer plus tard.',
      error: err.message
    });
  }
};
// Cette fonction permet d'ajouter un nouveau don à une campagne spécifique.

// Récupère une donation spécifique par son ID
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('campaign', 'title');
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation non trouvée'
      });
    }
    res.status(200).json(donation);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la donation',
      error: err.message
    });
  }
};
// Cette fonction récupère une donation spécifique en fonction de son ID.

// Met à jour une donation existante
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation non trouvée'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Donation mise à jour avec succès',
      donation: donation
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la donation',
      error: err.message
    });
  }
};
// Cette fonction met à jour une donation existante.
