const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError('You need to log in'));
      return;
    }

    const token = extractBearerToken(authorization);
    const payload = jwt.verify(token, 'gen');

    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('You need to log in'));
    return;
  }
  next();
};
