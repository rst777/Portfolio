const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || '1h';

// Middleware d'authentification
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("En-tête Authorization reçu :", authHeader); // Pour vérifier l'en-tête reçu


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Tentative d'accès sans token");
    return res.status(401).json({ message: 'Non autorisé : Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Vérification de l'expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTime) {
      console.log("Tentative d'utilisation d'un token expiré");
      return res.status(401).json({ message: 'Non autorisé : Token expiré' });
    }

    // Rafraîchissement du token si proche de l'expiration (exemple : moins de 5 minutes)
    if (decoded.exp - currentTime < 300) {
      const newToken = jwt.sign({ ...decoded, exp: Math.floor(Date.now() / 1000) + 3600 }, JWT_SECRET);
      res.setHeader('New-Token', newToken);
    }

    console.log(`Token vérifié pour l'utilisateur: ${decoded.username || decoded.email}`);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur de vérification du token:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Non autorisé : Token expiré' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Non autorisé : Token invalide' });
    }
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}


module.exports = authMiddleware;
