const Project = require('../models/project.model');
const mongoose = require('mongoose');

const ERROR_MESSAGES = {
  NOT_FOUND: 'Projet non trouvé',
  SERVER_ERROR: 'Erreur serveur',
  INVALID_ID: 'ID de projet invalide',
  INVALID_SORT_FIELD: 'Champ de tri invalide',
  INVALID_AMOUNT: 'Montant cible invalide'
};

// Champs de tri disponibles
const VALID_SORT_FIELDS = ['title', 'targetAmount', 'createdAt'];

// Helper pour valider un ObjectId MongoDB
const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Liste tous les projets avec pagination et tri
 */
exports.list = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    if (!VALID_SORT_FIELDS.includes(sortBy)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SORT_FIELD });
    }

    const options = {
      page: Math.max(parseInt(page, 10), 1),
      limit: Math.min(parseInt(limit, 10), 100),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const result = await Project.paginate({}, options);
    res.json(result);

  } catch (err) {
    res.status(500).json({
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: err.message
    });
  }
};

/**
 * Crée un nouveau projet
 */
exports.create = async (req, res) => {
  try {
    const { title, description, targetAmount } = req.body;

    // Validation des champs requis
    if (!title || !description || isNaN(targetAmount) || targetAmount <= 0) {
      return res.status(400).json({
        message: "Veuillez fournir un nom, une description et un montant cible valide."
      });
    }

    const project = new Project({
      title,
      description,
      targetAmount: parseFloat(targetAmount),
      image: req.file ? `/uploads/${req.file.filename}` : null // Si vous gérez des images
    });

    await project.save();
    res.status(201).json(project);

  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la création du projet',
      error: err.message
    });
  }
};

/**
 * Récupère un projet spécifique par son ID
 */
exports.read = async (req, res) => {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });

    res.json(project);

  } catch (err) {
    res.status(500).json({
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: err.message
    });
  }
};

/**
 * Met à jour un projet existant
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, targetAmount } = req.body;

    if (!validateId(id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }

    // Validation des champs si fournis
    if (targetAmount && (isNaN(targetAmount) || targetAmount <= 0)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_AMOUNT });
    }

    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(targetAmount && { targetAmount: parseFloat(targetAmount) }),
      ...(req.file && { image: `/uploads/${req.file.filename}` }) // Si vous gérez des images
    };

    const project = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });

    res.json(project);

  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la mise à jour',
      error: err.message
    });
  }
};

/**
 * Supprime un projet par son ID
 */
exports.remove = async (req, res) => {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
    }

    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });

    res.json({
      message: 'Projet supprimé avec succès',
      deletedId: project._id
    });

  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la suppression',
      error: err.message
    });
  }
};
