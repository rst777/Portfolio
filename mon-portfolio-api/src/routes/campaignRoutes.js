// routes/campaignRoutes.js

const express = require('express');
const router = express.Router();
const donationCampaignController = require('../controllers/donationCampaignController');
const upload = require('../middlewares/uploadMiddleware');

// Créer une nouvelle campagne (avec upload d'image)
router.post('/', upload.single('image'), donationCampaignController.createCampaign);

// Obtenir toutes les campagnes
router.get('/', donationCampaignController.getAllCampaigns);

// Obtenir une campagne spécifique par son ID
router.get('/:id', donationCampaignController.getCampaignById);

// Mettre à jour une campagne
router.put('/:id', donationCampaignController.updateCampaign);

// Supprimer une campagne
router.delete('/:id', donationCampaignController.deleteCampaign);

// Faire un don à une campagne spécifique
router.post('/:id/donate', donationCampaignController.donateToCampaign);

// Obtenir les campagnes actives (si implémenté dans le contrôleur)
// router.get('/active', donationCampaignController.getActiveCampaigns);

module.exports = router;
