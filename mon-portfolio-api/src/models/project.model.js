const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le nom du projet est requis'],
    trim: true,
    maxlength: [100, 'Le nom du projet ne peut pas dépasser 100 caractères'],
    index: true // Ajout d'un index pour optimiser les recherches sur le champ "name"
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Le montant cible est requis'],
    min: [1, 'Le montant cible doit être supérieur à 0'],
    max: [1000000, 'Le montant cible ne peut pas dépasser 1 000 000']
  },

  image: {
    type: String, // Stocke l'URL ou le chemin de l'image
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now // Ajoute automatiquement la date de création
  }
});

// Ajout du plugin de pagination
projectSchema.plugin(mongoosePaginate);

// Création du modèle à partir du schéma
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
