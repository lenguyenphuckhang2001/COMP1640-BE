const UserServices = require('../services/UserServices');
const User = require('../database/models/User');
const multer = require('multer');
const path = require('path');

const register = (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
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

module.exports = {
  register,
  createUser,
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
};
