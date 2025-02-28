// src/controllers/donationController.js
const Donation = require('../models/donation.model');
const DonationCampaign = require('../models/donationCampaign.model');

// Récupérer toutes les donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des donations');
  }
};

// src/controllers/donationController.js
exports.makeDonation = async (req, res) => {
  const { campaignId, amount, donorName, donorEmail } = req.body;

  // Validation du montant
  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Le montant du don doit être un nombre positif et supérieur à zéro.',
    });
  }

  const campaign = await DonationCampaign.findById(campaignId);
  if (!campaign) {
    return res.status(404).json({
      success: false,
      message: 'Campagne non trouvée. Assurez-vous que l\'ID de la campagne est correct.',
    });
  }

  const donation = new Donation({ amount, campaign: campaignId, donorName, donorEmail });

  try {
    // Mise à jour atomique du montant de la campagne
    const updatedCampaign = await DonationCampaign.findByIdAndUpdate(
      campaignId,
      { $inc: { raisedAmount: amount } }, // $inc permet d'ajouter un montant sans écraser les valeurs
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(400).json({
        success: false,
        message: 'Erreur lors de la mise à jour de la campagne. Essayez à nouveau.',
      });
    }

    // Sauvegarder la donation
    await donation.save();

    // Réponse positive après tout a fonctionné
    res.status(201).json({
      success: true,
      message: 'Don effectué avec succès.',
      donation: donation,
    });
  } catch (err) {
    console.error('Erreur interne du serveur:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur, veuillez réessayer plus tard.',
    });
  }
};
