// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 🔹 Route pour la connexion
router.post('/login', authController.login);

// 🔹 Route pour l'inscription
router.post('/signup', authController.signup);

module.exports = router;
