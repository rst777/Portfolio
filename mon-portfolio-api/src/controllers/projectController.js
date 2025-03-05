// src/controllers/projectController.js

const Project = require('../models/project.model');
const mongoose = require('mongoose');

const ERROR_MESSAGES = {
  NOT_FOUND: 'Projet non trouvé',
  SERVER_ERROR: 'Erreur serveur',
  INVALID_ID: 'ID de projet invalide',
  INVALID_SORT_FIELD: 'Champ de tri invalide'
};

// Liste des champs valides pour le tri
const VALID_SORT_FIELDS = ['name', 'year', 'createdAt'];

/**
 * Récupère tous les projets avec pagination et tri
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Validation du champ de tri
    if (!VALID_SORT_FIELDS.includes(sortBy)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SORT_FIELD });
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const projects = await Project.paginate({}, options);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: err.message });
  }
};

/**
 * Ajoute un nouveau projet
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du projet', error: err.message });
  }
};

/**
 * Récupère un projet spécifique par son ID
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.read = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: err.message });
  }
};

/**
 * Met à jour un projet existant
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
  }
};

/**
 * Supprime un projet
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.remove = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};
