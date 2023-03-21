const express = require('express');
const router = express.Router();

const {
  login,
  register,
  verifyEmail,
  forgotPassword,
  changePassword,
  logout,
} = require('../../controllers/authController');

const { isLoggedIn } = require('../../middlewares/authMiddleware');

router.post('/register', register);

router.post('/login', isLoggedIn, login);

router.get('/verify-email/:userId', verifyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:userId', changePassword);

router.post('/logout', logout);

module.exports = router;
