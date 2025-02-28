// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route pour obtenir tous les projets
router.get('/', projectController.list);

// Route pour créer un nouveau projet
router.post('/', projectController.create);

// Route pour obtenir un projet spécifique
router.get('/:id', projectController.read);

// Route pour mettre à jour un projet
router.put('/:id', projectController.update);

// Route pour supprimer un projet
router.delete('/:id', projectController.remove);

module.exports = router;
