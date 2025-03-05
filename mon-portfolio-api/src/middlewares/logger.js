// middleware/logger.js

function loggerMiddleware(req, res, next) {
  console.log('Time:', Date.now());
  next();
}

module.exports = loggerMiddleware;
