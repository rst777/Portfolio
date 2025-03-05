require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = require('./app'); // Importation de l'application Express

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

// Middleware pour servir des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));

// Connexion à MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur de connexion à MongoDB:', err));

app.listen(port, () => {
  console.log(`✅ API en cours d'exécution sur http://localhost:${port}`);
});
