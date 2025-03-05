// src/routes/donationCampaignRoutes.js

const express = require('express');
const router = express.Router();
const donationCampaignController = require('../controllers/donationCampaignController');

// Routes existantes
router.get('/', donationCampaignController.getAllCampaigns);
router.post('/', donationCampaignController.createCampaign);
router.get('/:id', donationCampaignController.getCampaignById);

// Nouvelles routes à ajouter
// Mettre à jour une campagne
router.put('/:id', donationCampaignController.updateCampaign);

// Supprimer une campagne
router.delete('/:id', donationCampaignController.deleteCampaign);

// Faire un don à une campagne spécifique
router.post('/:id/donate', donationCampaignController.donateToCampaign);

// Obtenir les campagnes actives (où la date de fin n'est pas dépassée)
router.get('/active', donationCampaignController.getActiveCampaigns);

module.exports = router;
