const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log('🚀 ~ file: jwt.js:8 ~ createToken ~ error', error);
    return error;
  }
};

const verifyToken = (token) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('🚀 ~ file: jwt.js:8 ~ createToken ~ error', error);
    return error;
  }
};

const authorize = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = {
  createToken,
  verifyToken,
  authorize,
};
