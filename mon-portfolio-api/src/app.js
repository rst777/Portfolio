const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const donationCampaignRoutes = require('./routes/donationCampaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const authMiddleware = require('./middlewares/auth.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const path = require('path');

const app = express();

// Middlewares pour parser les json
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use('/api/auth', authRoutes);

// Servir les fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.use(errorMiddleware);
module.exports = app;
