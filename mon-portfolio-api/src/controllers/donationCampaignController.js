const mongoose = require('mongoose');
const DonationCampaign = require('../models/donationCampaign.model');

// Récupérer toutes les campagnes de dons
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await DonationCampaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des campagnes');
  }
};

// Créer une nouvelle campagne de dons
exports.createCampaign = async (req, res) => {
  const { title, description, targetAmount, endDate } = req.body;

  const campaign = new DonationCampaign({ title, description, targetAmount, endDate });

  try {
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).send('Erreur lors de la création de la campagne');
  }
};

// Récupérer une campagne par son ID
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  // Vérifier que l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('ID de campagne invalide');
  }

  try {
    const campaign = await DonationCampaign.findById(id);
    if (!campaign) {
      return res.status(404).send('Campagne non trouvée');
    }
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération de la campagne');
  }
};
