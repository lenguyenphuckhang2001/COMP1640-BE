var express = require('express');
var router = express.Router();

const {
  login,
  register,
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
  logout,
  verifyEmail,
  forgotPassword,
  changePassword,
} = require('../../controllers/UserController');

const avatarUploader = require('../../middlewares/avatarUpload');

//METHOD GET
router.get('/', getAllUser);

router.get('/:userId', getUserById);

//METHOD POST
router.post('/register', register);

router.get('/verify-email/:userId', verifyEmail);

router.post('/login', login);
 
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:userId', changePassword);


//upload user images
router.post('/avatar/:userId', avatarUploader, uploadAvatar);

//METHOD PATCH
router.patch('/:userId', patchEditUser);

//METHOD DELETE
router.delete('/:userId', deleteUser);


module.exports = router;
