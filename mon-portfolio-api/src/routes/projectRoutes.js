// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const validate = require('../middlewares/validationMiddleware');
const projectController = require('../controllers/projectController');

// Configuration de Multer pour le stockage des images
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite à 5 Mo
  },
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les formats JPEG et PNG sont acceptés'), false);
    }
  }
});

// Route pour créer un projet avec image et validation
router.post('/',
  upload.single('image'), // Gestion de l'image AVANT la validation
  validate([
    body('title').notEmpty().withMessage('Le nom du projet est requis'),
    body('description').notEmpty().withMessage('La description est requise'),
    body('targetAmount').isFloat({ min: 1 }).withMessage('Le montant cible doit être supérieur à 0')
  ]),
  projectController.create
);

// Route pour mettre à jour un projet avec image
router.put('/:id',
  upload.single('image'), // Gestion de l'image
  validate([
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('targetAmount').optional().isFloat({ min: 1 })
  ]),
  projectController.update
);

// Autres routes
router.get('/', projectController.list);
router.get('/:id', projectController.read);
router.delete('/:id', projectController.remove);

module.exports = router;
