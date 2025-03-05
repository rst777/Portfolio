// src/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');
const projectController = require('../controllers/projectController');

// Route pour créer un nouveau projet avec validation
router.post('/', validate([
  body('name').notEmpty().withMessage('Le nom du projet est requis'),
  body('description').notEmpty().withMessage('La description est requise'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('L\'année doit être valide'),
]), projectController.create);

// Autres routes...
router.get('/', projectController.list);
router.get('/:id', projectController.read);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.remove);

module.exports = router;
