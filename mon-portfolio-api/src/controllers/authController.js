// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const Contact = require('../models/contact.model');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || '1h';

// Vérifiez que JWT_SECRET est défini
if (!JWT_SECRET) {
  throw new Error("La clé JWT_SECRET n'est pas définie dans les variables d'environnement");
}

/**
 * 🔹 Connexion (Login)
 * @route POST /auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des entrées
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis" });
    }

    const contact = await Contact.findOne({ email });

    // Vérifiez si l'utilisateur existe et si le mot de passe est correct
    if (!contact || !(await contact.comparePassword(password))) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: contact._id, email: contact.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME }
    );

    res.json({
      message: "Connexion réussie",
      token,
      expiresIn: TOKEN_EXPIRATION_TIME,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

/**
 * 🔹 Inscription (Signup)
 * @route POST /auth/signup
 */
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation des entrées
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifiez si l'email existe déjà
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Création d'un nouvel utilisateur
    const newContact = new Contact({ firstName, lastName, email, password });
    await newContact.save();

    // Envoi d'une réponse de succès
    res.status(201).json({
      message: "Inscription réussie",
      user: {
        id: newContact._id,
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        email: newContact.email
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      message: "Erreur lors de l'inscription",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
