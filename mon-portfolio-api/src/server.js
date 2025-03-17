// src/server.js

require('dotenv').config(); /*Load environment variables from a .env file into process.env*/

const express = require('express');
const cors = require('cors');
const compression = require('compression'); /*Node.js compression middleware*/
const path = require('path');
const mongoose = require('mongoose'); /*Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.*/


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
