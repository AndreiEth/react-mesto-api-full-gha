const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer', '');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError('You need to log in'));
    }

    const token = extractBearerToken(authorization);
    const payload = jwt.verify(token, 'gen');

    console.log(token);
    console.log(payload);

    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('You need to log in'));
  }
  return next();
};
