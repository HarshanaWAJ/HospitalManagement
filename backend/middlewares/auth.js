const jwt = require('jsonwebtoken');

const blacklistedTokens = [];

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ msg: 'Token is blacklisted, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.blacklistToken = (token) => {
  blacklistedTokens.push(token);
};
