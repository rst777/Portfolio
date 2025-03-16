const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/authMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const path = require('path');


const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use('/uploads', express.static('uploads'));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes non protégées
app.use('/api/auth', authRoutes);

// Middleware d'authentification
app.use('/api', authMiddleware);

// Routes protégées
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);

// Route principale
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Gestion des erreurs
app.use(errorMiddleware);

module.exports = app;
