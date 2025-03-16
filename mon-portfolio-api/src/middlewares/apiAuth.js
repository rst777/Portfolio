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
  const storedHashedKey = '36c25744143c69b91df89a90af5f7df7002ace46ab9000b86b3f29eeb26f837029cb631718fce9be43f64624ecb9e2cfee5de1eeda6ecc6c4a10e1a565786a1b.abed3ed7aca99fd9';
  const [, salt] = storedHashedKey.split('.');

  const hashedProvidedKey = hashApiKey(providedKey, salt);

  if (hashedProvidedKey === storedHashedKey) {
    next();
  } else {
    res.status(401).json({ message: 'Accès non autorisé' });
  }
};
