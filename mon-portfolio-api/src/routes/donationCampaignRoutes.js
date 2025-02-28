// src/routes/donationCampaignRoutes.js
const express = require('express');
const router = express.Router();
const donationCampaignController = require('../controllers/donationCampaignController');

// Récupérer toutes les campagnes
router.get('/', donationCampaignController.getAllCampaigns);

// Créer une nouvelle campagne
router.post('/', donationCampaignController.createCampaign);

// Récupérer une campagne par son ID
router.get('/:id', donationCampaignController.getCampaignById);


module.exports = router;
