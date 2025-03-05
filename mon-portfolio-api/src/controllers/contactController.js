// src/controllers/contactController.js

const Contact = require('../models/contact.model');
const bcrypt = require('bcrypt');


// Liste tous les contacts
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const contacts = await Contact.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Contact.countDocuments();
    res.status(200).json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des contacts', error: error.message });
  }
};

// Crée un nouveau contact
exports.create = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    // Ne renvoyez pas le mot de passe dans la réponse
    savedContact.password = undefined;
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du contact', error: error.message });
  }
};
// Affiche un contact spécifique
exports.read = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-password');
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du contact', error: error.message });
  }
};

// Met à jour un contact
exports.update = async (req, res) => {
  try {
    if (req.body.password) {
      // Si le mot de passe est fourni, le hacher manuellement
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    updatedContact.password = undefined; // Ne pas renvoyer le mot de passe
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du contact', error: error.message });
  }
};

// Supprime un contact
exports.remove = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.status(200).json({ message: 'Contact supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du contact', error: error.message });
  }
};
// Ajoute un don à un contact
exports.addDonation = async (req, res) => {
  try {
    const { amount, campaign } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Le montant du don doit être un nombre positif' });
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    contact.addDonation(amount, campaign);
    await contact.save();
    res.status(200).json({ message: 'Don ajouté avec succès', contact });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du don', error: error.message });
  }
};
