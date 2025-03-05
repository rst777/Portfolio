const express = require('express');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact.model');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || '1h';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const contact = await Contact.findOne({ email });

    if (!contact || !(await contact.comparePassword(password))) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { userId: contact._id, email: contact.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME }
    );

    res.json({ token, expiresIn: TOKEN_EXPIRATION_TIME });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const newContact = new Contact({ firstName, lastName, email, password });
    await newContact.save();

    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
  }
});

module.exports = router;
