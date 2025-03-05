// src/server.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

const app = require('./app');

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(compression());
app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur de connexion à MongoDB:', err));

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur est survenue !');
});

app.listen(port, () => {
  console.log(`✅ API en cours d'exécution sur http://localhost:${port}`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
