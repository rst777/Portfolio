// middlewares/apiAuth.js

const crypto = require('crypto');

function hashApiKey(key, salt) {
  const buffer = crypto.scryptSync(key, salt, 64);
  return `${buffer.toString('hex')}.${salt}`;
}

module.exports = async (req, res, next) => {
  const providedKey = req.header('X-API-Key');
  if (!providedKey) {
    return res.status(401).json({ message: 'API Key manquante' });
  }

  // Récupérez la clé hachée stockée depuis votre base de données
  const storedHashedKey = '0c330b3573587f834ecd4eef1f9d4d997eb9cd02d8ce3259d746cc82d68593b3fed5e1f4a52b8142926dd407c76c4584f1ca059861f6993d25766e2225da8776.c87bd40f8a221a8f';
  const [, salt] = storedHashedKey.split('.');

  const hashedProvidedKey = hashApiKey(providedKey, salt);

  if (hashedProvidedKey === storedHashedKey) {
    next();
  } else {
    res.status(401).json({ message: 'Accès non autorisé' });
  }
};
