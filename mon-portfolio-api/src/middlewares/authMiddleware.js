const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || '3600'; // En secondes (1h)

const ERROR_MESSAGES = {
  MISSING_TOKEN: 'Non autorisé : Token manquant',
  EXPIRED_TOKEN: 'Non autorisé : Token expiré',
  INVALID_TOKEN: 'Non autorisé : Token invalide',
  SERVER_ERROR: 'Erreur interne du serveur'
};

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("En-tête Authorization reçu :", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Tentative d'accès sans token");
    return res.status(401).json({ message: ERROR_MESSAGES.MISSING_TOKEN });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("Token reçu:", token);
    console.log("JWT_SECRET utilisé:", JWT_SECRET);

    // Vérification du token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token décodé:", decoded);

    // Rafraîchissement du token si proche de l'expiration (moins de 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    const timeUntilExpiration = decoded.exp - currentTime;
    const refreshThreshold = 300; // 5 minutes en secondes

    if (timeUntilExpiration < refreshThreshold) {
      const newToken = jwt.sign(
        { ...decoded, exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRATION_TIME) },
        JWT_SECRET
      );
      res.setHeader('New-Token', newToken);
      console.log("Nouveau token généré :", newToken);
    }

    console.log(`Token vérifié pour l'utilisateur: ${decoded.username || decoded.email}`);
    req.user = decoded; // Ajoute les informations utilisateur à la requête
    next(); // Passe au middleware suivant ou à la route
  } catch (err) {
    console.error('Erreur de vérification du token:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: ERROR_MESSAGES.EXPIRED_TOKEN });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    return res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

module.exports = authMiddleware;
