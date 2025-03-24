const express = require('express'); /*nodeJs application module*/
const cors = require('cors'); /*Cross-Origin Resource Sharing*/
const morgan = require('morgan'); /*HTTP request logger middleware for node.js*/
const authMiddleware = require('./middlewares/authMiddleware'); /*Middleware d'authentification*/
const loggerMiddleware = require('./middlewares/loggerMiddleware'); /*Middleware de journalisation*/
const errorMiddleware = require('./middlewares/errorMiddleware'); /*Middleware de gestion des erreurs*/
const authRoutes = require('./routes/authRoutes'); /*Routes d'authentification*/
const projectRoutes = require('./routes/projectRoutes'); /*Routes des projets*/
const contactRoutes = require('./routes/contactRoutes'); /*Routes des contacts*/
const donationRoutes = require('./routes/donationRoutes'); /*Routes des dons*/
const campaignRoutes = require('./routes/campaignRoutes'); /*Routes des campagnes*/
const path = require('path'); /*The path module provides utilities for working with file and directory paths*/
const helmet = require('helmet'); /*Helmet helps you secure your Express apps by setting various HTTP headers*/

const app = express(); /*Create an instance of an Express application*/

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use('/uploads', express.static('uploads')); /*Serve static files*/

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
