// scripts/generateApiKey.js // npm run generate-api-key

const crypto = require('crypto');

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

function generateSecretHash(key) {
  const salt = crypto.randomBytes(8).toString('hex');
  const buffer = crypto.scryptSync(key, salt, 64);
  return `${buffer.toString('hex')}.${salt}`;
}

const newApiKey = generateApiKey();
console.log('Nouvelle clé API :', newApiKey);

const hashedSecret = generateSecretHash(newApiKey);
console.log('Clé API hachée pour stockage :', hashedSecret);
