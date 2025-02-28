const mongoose = require('mongoose');
require('dotenv').config(); // Charge les variables d'environnement

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connecté à MongoDB');
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err);
    process.exit(1); // Arrête le serveur en cas d'échec
  }
};

// Gestion des événements MongoDB
mongoose.connection.on('connected', () => console.log('🟢 MongoDB connecté'));
mongoose.connection.on('error', err => console.error('🔴 Erreur MongoDB:', err));
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB déconnecté. Tentative de reconnexion...');
  connectDB();
});

connectDB();

module.exports = mongoose;
