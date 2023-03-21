const User = require('../database/models/User');
const { hashPassword, checkPassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/sendEmail');

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Empty email or password');

    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(403).send("Can't find any user");

    const isValidPassword = await checkPassword(password, foundUser.password);
    if (!isValidPassword) return res.status(401).send('Password is not valid');

    const { email: userEmail, role, username } = foundUser;
    const payload = { email: userEmail, role, username };
    const token = await createToken(payload);
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    res.json(token);
  } catch (error) {
    console.log('🚀 ~ file: UserController.js:64 ~ login ~ error', error);
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).send('empty email or password');
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const link = `${process.env.APP_URL}/users/reset-password/${user._id}`;
    const message = `Please click the link below to reset your password: ${link}`;
    await sendEmail(user.email, message);
    res.send('Please check your email to reset your password');
  } catch (error) {
    res.status(400).send('An error occured');
    console.log('🚀 ~ file: UserController.js:64 ~ login ~ error', error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    let { password } = req.body;
    if (!password) return res.status(400).send('empty password');
    const hashedPassword = await hashPassword(password);
    const user = await User.findByIdAndUpdate(req.params.userId, { password: hashedPassword });
    if (!user) return res.status(400).send('User not found');
    res.send('Password changed successfully');
  } catch (error) {
    res.status(400).send('An error occured');
    console.log('🚀 ~ file: UserController.js:64 ~ login ~ error', error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  forgotPassword,
  changePassword,
  logout,
};
