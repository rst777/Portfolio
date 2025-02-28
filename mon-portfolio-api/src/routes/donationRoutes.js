// src/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Route pour récupérer toutes les donations
router.get('/', donationController.getAllDonations);


// Faire un don
router.post('/', donationController.makeDonation);


module.exports = router;
