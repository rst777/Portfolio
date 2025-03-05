const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema({
  name: {
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
  year: {
    type: Number,
    required: [true, 'L\'année est requise'],
    min: [1900, 'L\'année doit être supérieure ou égale à 1900'],
    max: [new Date().getFullYear(), `L'année ne peut pas dépasser ${new Date().getFullYear()}`]
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
