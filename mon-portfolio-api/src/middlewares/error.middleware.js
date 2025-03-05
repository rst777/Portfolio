// middleware/error.middleware.js

module.exports = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue' });
};
