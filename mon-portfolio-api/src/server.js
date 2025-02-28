const express = require('express'); // Assure-toi d'importer express
const path = require('path'); // Assure-toi d'importer path

const app = require('./app'); // Importation de l'application Express
const mongoose = require('./db'); // Connexion à MongoDB

const port = process.env.PORT || 3000;

// Middleware pour servir des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, 'frontend/assets'))); // Sert les fichiers du dossier frontend/assets

app.listen(port, () => {
  console.log(`✅ API en cours d'exécution sur http://localhost:${port}`);
});
