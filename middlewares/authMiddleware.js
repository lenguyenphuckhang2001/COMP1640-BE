const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;

    console.log('🚀 ~ file: authMiddleware.js:6 ~ token:', token);

    if (!token) return res.status(401).send('Unauthorized: No token provided');

    const { email, role, username } = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { email, role, username };

    next();
  } catch (error) {
    console.log('🚀 ~ file: authMiddleware.js:13 ~ error:', error);

    return res.sendStatus(500);
  }
};

module.exports = { isLoggedIn };
