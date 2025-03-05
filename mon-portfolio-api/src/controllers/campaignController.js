// src/controllers/campaignController.js

const Campaign = require('../models/campaign');

/**
 * Crée une nouvelle campagne
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, goal, startDate, endDate } = req.body;

    // Validation basique
    if (!name || !description || !goal) {
      return res.status(400).json({ message: "Nom, description et objectif sont requis" });
    }

    const newCampaign = new Campaign({
      name,
      description,
      goal,
      startDate,
      endDate
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création de la campagne", error: err.message });
  }
};

/**
 * Récupère toutes les campagnes avec pagination
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getAllCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const campaigns = await Campaign.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Campaign.countDocuments();

    res.status(200).json({
      campaigns,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des campagnes", error: err.message });
  }
};

/**
 * Récupère une campagne spécifique par son ID
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campagne non trouvée" });
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de la campagne", error: err.message });
  }
};

/**
 * Met à jour une campagne
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCampaign) return res.status(404).json({ message: "Campagne non trouvée" });
    res.status(200).json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la campagne", error: err.message });
  }
};

/**
 * Supprime une campagne
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.deleteCampaign = async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) return res.status(404).json({ message: "Campagne non trouvée" });
    res.status(200).json({ message: "Campagne supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de la campagne", error: err.message });
  }
};
