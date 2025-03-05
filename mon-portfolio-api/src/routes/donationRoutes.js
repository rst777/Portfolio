// src/routes/donationRoutes.js

const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');

// Route pour récupérer toutes les donations
router.get('/', donationController.getAllDonations);

// Route pour faire un don
router.post('/', validate([
  body('amount').isFloat({ min: 0.01 }).withMessage('Le montant doit être un nombre positif'),
  body('donorName').notEmpty().withMessage('Le nom du donateur est requis'),
  // Ajoutez d'autres validations selon vos besoins
]), donationController.makeDonation);

// Route pour récupérer une donation spécifique
router.get('/:id', donationController.getDonationById);

// Route pour mettre à jour une donation (si nécessaire)
router.put('/:id', donationController.updateDonation);

module.exports = router;
