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

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('view-information', { user });
  } catch (err) {
    next(err);
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

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Init upload
const upload = multer({
  storage: storage,
}).single('avatar');

//Upload avatar
const uploadAvatar = (req, res) => {
  const userId = req.params.userId;
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Avatar upload failed' });
    } else {
      // Update user model with new avatar file path
      User.findByIdAndUpdate(userId, { avatar: `/uploads/${req.file.filename}` }, (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Avatar update failed' });
        } else {
          console.log('Avatar updated successfully!');
          res.status(200).json({ message: 'Avatar updated successfully!' });
        }
      });
    }
  });
};

module.exports = {
  register,
  createUser,
  getUser,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
};
