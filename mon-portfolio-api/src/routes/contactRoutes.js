const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Assure-toi que ce fichier existe !

// Définition des routes
router.get('/', contactController.list);
router.post('/', contactController.create);
router.get('/:id', contactController.read);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.remove);

module.exports = router;
