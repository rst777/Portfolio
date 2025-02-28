// src/controllers/contactController.js

exports.list = (req, res) => {
  res.json({ message: 'Liste des contacts' });
};

exports.create = (req, res) => {
  res.json({ message: 'Création d\'un contact' });
};

exports.read = (req, res) => {
  res.json({ message: 'Affichage d\'un contact' });
};

exports.update = (req, res) => {
  res.json({ message: 'Mise à jour d\'un contact' });
};

exports.remove = (req, res) => {
  res.json({ message: 'Suppression d\'un contact' });
};
