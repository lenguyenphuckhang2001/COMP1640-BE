const UserServices = require('../services/UserServices');
const User = require('../database/models/User');
const { hashPassword, checkPassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/sendEmail');

const getAllUsers = async (req, res, next) => {
  try {
    const user = await UserServices.getAllUsers({});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    let data = req.body;

    const user = await User.findOne({ email: data.email });

    if (user) return res.status(400).send('user already exist');

    const hashedPassword = await hashPassword(data.password);

    const newUser = await User.create({ ...data, password: hashedPassword });

    if (!newUser) return res.status(500).send('Internal server error');

    const message = `please click the link below to verify your email address: ${process.env.APP_URL}/verify-email/${newUser._id}`;
    await sendEmail(newUser.email, message);

    return res.status(200).send(newUser);
  } catch (error) {
    console.log('🚀 ~ file: UserController.js:31 ~ register ~ error', error);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send('User not found');

    await User.findByIdAndUpdate(req.params.userId, { verified: true });

    res.send('Email verified');
  } catch (error) {
    res.status(400).send('An error occured');
  }
};
const createUser = (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);
    const user = req.body;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!req.params.userId) return res.status(400).json({ message: 'Not found ID!' });
    const user = await UserServices.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await User.find({});
    res.json(getAllUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const patchEditUser = async (req, res, next) => {
  try {
    const userUpdate = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUserInfo = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deleteUserInfo);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Init upload
// const upload = multer({
//   storage: storage,
// }).single('avatar');

//Upload avatar
const uploadAvatar = async (req, res) => {
  //images//
  try {
    const userId = req.params.userId;
    const image = req.files[0].path;
    const filterPath = image.slice(6).replace(/\\/g, '/');
    console.log('🚀 ~ file: UserController.js:71 ~ uploadAvatar ~ filterPath:', filterPath);

    const data = await User.findByIdAndUpdate(userId, { avatar: filterPath }, { new: true });
    res.status(200).json({ message: 'Avatar updated successfully!', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) return res.status(400).send('empty email or password');

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

    const link = `${process.env.APP_URL}/reset-password/${user._id}`;
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
  register,
  createUser,
  login,
  getAllUsers,
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
  logout,
  verifyEmail,
  forgotPassword,
  changePassword,
};
