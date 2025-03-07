// src/controllers/donationCampaignController.js

const mongoose = require('mongoose');
const DonationCampaign = require('../models/donationCampaign.model');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Assurez-vous que ce dossier existe
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
exports.createCampaign = [
  upload.single('image'),
  async (req, res) => {
    const { title, description, targetAmount, endDate } = req.body;

    // Vérification des champs requis
    if (!title || !description || !targetAmount || !endDate) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const imagePath = req.file ? req.file.path : null;

    const campaign = new DonationCampaign({
      title,
      description,
      targetAmount,
      endDate,
      image: imagePath
    });

    try {
      await campaign.save();
      res.status(201).json(campaign);
    } catch (err) {
      console.error('Erreur lors de la création de la campagne:', err);
      res.status(400).json({ message: 'Erreur lors de la création de la campagne', error: err.message });
    }
  }
];

// Récupérer une campagne par son ID
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

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

// Mettre à jour une campagne
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { title, description, targetAmount, endDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('ID de campagne invalide');
  }

  try {
    const updatedCampaign = await DonationCampaign.findByIdAndUpdate(
      id,
      { title, description, targetAmount, endDate },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).send('Campagne non trouvée');
    }

    res.status(200).json(updatedCampaign);
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour de la campagne');
  }
};

// Supprimer une campagne
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('ID de campagne invalide');
  }

  try {
    const deletedCampaign = await DonationCampaign.findByIdAndDelete(id);

    if (!deletedCampaign) {
      return res.status(404).send('Campagne non trouvée');
    }

    res.status(200).send('Campagne supprimée avec succès');
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression de la campagne');
  }
};

// Faire un don à une campagne spécifique
exports.donateToCampaign = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de campagne invalide' });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Montant du don invalide' });
  }

  try {
    const campaign = await DonationCampaign.findById(id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }

    const remainingAmount = campaign.targetAmount - campaign.raisedAmount;
    if (amount > remainingAmount) {
      return res.status(400).json({ message: `Le don ne peut pas dépasser le montant restant de ${remainingAmount}` });
    }

    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(200).json({ message: 'Don ajouté avec succès', campaign });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du don:', err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du don', error: err.message });
  }
};

// Obtenir les campagnes actives
exports.getActiveCampaigns = async (req, res) => {
  try {
    const activeCampaigns = await DonationCampaign.find({ endDate: { $gte: new Date() } });
    res.status(200).json(activeCampaigns);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des campagnes actives');
  }
};
