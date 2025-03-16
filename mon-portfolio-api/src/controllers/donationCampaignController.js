// src/controllers/donationCampaignController.js

const mongoose = require('mongoose');
const DonationCampaign = require('../models/donationCampaign.model');
const { HTTP_STATUS } = require('../constants/httpStatus');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const fsp = fs.promises;

/**
 * Récupère toutes les campagnes de dons
 * @route GET /api/campaigns
 */
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await DonationCampaign.find();
    res.status(HTTP_STATUS.OK).json(campaigns);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la récupération des campagnes',
      error: err.message
    });
  }
};

/**
 * Crée une nouvelle campagne de dons
 * @route POST /api/campaigns
 */
exports.createCampaign = async (req, res) => {
  const { title, description, targetAmount, endDate } = req.body;
  let imageName = null;

  // Validation des champs requis
  if (!title || !description || !targetAmount || !endDate) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Tous les champs sont requis' });
  }

  // Validation du montant cible
  if (isNaN(targetAmount) || targetAmount <= 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Le montant cible doit être un nombre positif' });
  }

  // Validation de la date de fin
  if (new Date(endDate) <= new Date()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'La date de fin doit être dans le futur' });
  }

  try {
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      imageName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
      const oldPath = req.file.path;
      const newPath = path.join('uploads', imageName);

      // Utiliser une promesse pour fs.rename
      await fs.promises.rename(oldPath, newPath);
    }

    const campaign = new DonationCampaign({
      title,
      description,
      targetAmount,
      endDate,
      image: imageName,
      raisedAmount: 0
    });

    await campaign.save();
    res.status(HTTP_STATUS.CREATED).json(campaign);
  } catch (err) {
    console.error(err);
    // Gérer les erreurs de validation de Mongoose
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Erreur de validation lors de la création de la campagne',
        errors: err.errors
      });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la création de la campagne',
      error: err.message
    });
  }
};

/**
 * Récupère une campagne spécifique par son ID
 * @route GET /api/campaigns/:id
 */
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'ID de campagne invalide' });
  }

  try {
    const campaign = await DonationCampaign.findById(id);
    if (!campaign) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Campagne non trouvée' });
    }
    res.status(HTTP_STATUS.OK).json(campaign);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la récupération de la campagne',
      error: err.message
    });
  }
};

/**
 * Met à jour une campagne existante
 * @route PUT /api/campaigns/:id
 */
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { title, description, targetAmount, endDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'ID de campagne invalide' });
  }

  try {
    const updatedCampaign = await DonationCampaign.findByIdAndUpdate(
      id,
      { title, description, targetAmount, endDate },
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Campagne non trouvée' });
    }

    res.status(HTTP_STATUS.OK).json(updatedCampaign);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la mise à jour de la campagne',
      error: err.message
    });
  }
};

/**
 * Supprime une campagne
 * @route DELETE /api/campaigns/:id
 */
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'ID de campagne invalide' });
  }

  try {
    const deletedCampaign = await DonationCampaign.findByIdAndDelete(id);

    if (!deletedCampaign) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Campagne non trouvée' });
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Campagne supprimée avec succès' });
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la suppression de la campagne',
      error: err.message
    });
  }
};

/**
 * Ajoute un don à une campagne spécifique
 * @route POST /api/campaigns/:id/donate
 */
exports.donateToCampaign = async (req, res) => {
  const { id } = req.params; // ID de la campagne
  const { amount } = req.body; // Montant du don

  // Validation de l'ID et du montant
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'ID de campagne invalide' });
  }

  if (!amount || amount <= 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Montant du don invalide' });
  }

  // Validation du montant maximal du don (modifié)
  const maxDonationAmount = 1000000; // Limite maximale de 1 000 000 €
  if (amount > maxDonationAmount) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Le montant du don est trop élevé. Le montant maximal autorisé est de ' + maxDonationAmount + ' €.' });
  }

  try {
    // Recherche de la campagne par son ID
    const campaign = await DonationCampaign.findById(id);

    if (!campaign) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Campagne non trouvée' });
    }

    // Utilisation de la méthode addDonation du modèle
    await campaign.addDonation(amount);

    // Retourne une réponse avec les détails mis à jour de la campagne
    res.status(HTTP_STATUS.OK).json({
      message: 'Don ajouté avec succès',
      updatedRaisedAmount: campaign.raisedAmount,
      campaign,
    });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du don :', err.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de l\'ajout du don',
      error: err.message,
    });
  }
};

/**
 * Récupère toutes les campagnes actives (dont la date de fin n'est pas dépassée)
 * @route GET /api/campaigns/active
 */
exports.getActiveCampaigns = async (req, res) => {
  try {
    const activeCampaigns = await DonationCampaign.find({ endDate: { $gte: new Date() } });
    res.status(HTTP_STATUS.OK).json(activeCampaigns);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la récupération des campagnes actives',
      error: err.message
    });
  }
};

/**
 * Met à jour l'image d'une campagne existante
 * @route PUT /api/campaigns/:id/image
 */
exports.updateCampaignImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'ID de campagne invalide' });
  }

  if (!req.file) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Aucune image fournie' });
  }

  try {
    const campaign = await DonationCampaign.findById(id);
    if (!campaign) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Campagne non trouvée' });
    }

    // Supprimer l'ancienne image si elle existe
    if (campaign.image) {
      const oldImagePath = path.join('uploads', campaign.image);
      if (fs.existsSync(oldImagePath)) {
        // Utiliser une promesse pour fs.unlink
        await fs.promises.unlink(oldImagePath);
      }
    }

    // Générer un nouveau nom pour l'image
    const fileExtension = path.extname(req.file.originalname);
    const newImageName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
    const oldPath = req.file.path;
    const newPath = path.join('uploads', newImageName);
    fs.renameSync(oldPath, newPath);

    // Mettre à jour la campagne avec le nouveau nom d'image
    campaign.image = newImageName;
    await campaign.save();

    res.status(HTTP_STATUS.OK).json({
      message: 'Image de la campagne mise à jour avec succès',
      campaign: campaign
    });
  } catch (err) {
    console.error(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Erreur lors de la mise à jour de l\'image de la campagne',
      error: err.message
    });
  }
};
