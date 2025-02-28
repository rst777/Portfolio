const express = require('express');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const donationCampaignRoutes = require('./routes/donationCampaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques (CSS, images, JS)
app.use('/assets', express.static('frontend/assets')); // Sert les fichiers du dossier frontend/assets

// Définition des routes API
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/donation-campaigns', donationCampaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);

// Autres routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html'); // Envoie le fichier index.html comme page d'accueil
});

module.exports = app;
