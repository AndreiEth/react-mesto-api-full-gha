const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies.jwt;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('You need to log in'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'gen');
  } catch (err) {
    return next(new UnauthorizedError('You need to log in'));
  }

  req.user = payload;
  return next();
};
