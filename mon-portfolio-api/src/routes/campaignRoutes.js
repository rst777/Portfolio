// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Route pour créer une nouvelle campagne
router.post('/', campaignController.createCampaign);

// Route pour récupérer toutes les campagnes
router.get('/', campaignController.getAllCampaigns);

// Route pour récupérer une campagne spécifique
router.get('/:id', campaignController.getCampaignById);

// Route pour mettre à jour une campagne
router.put('/:id', campaignController.updateCampaign);

// Route pour supprimer une campagne
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router;
