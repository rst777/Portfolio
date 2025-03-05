const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const donationCampaignRoutes = require('./routes/donationCampaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const authMiddleware = require('./middlewares/auth');
const loggerMiddleware = require('./middlewares/logger');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Routes publiques
app.use('/assets', express.static('frontend/assets'));

// Routes d'authentification (non protégées)
app.use('/api/auth', authRoutes);

// Middleware d'authentification pour les autres routes API
app.use('/api', authMiddleware);

// Routes API protégées
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/donation-campaigns', donationCampaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);

// Route principale
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

module.exports = app;
