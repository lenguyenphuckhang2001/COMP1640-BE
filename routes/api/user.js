var express = require('express');
var router = express.Router();

const {
  createUser,
  register,
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
} = require('../../controllers/UserController');

const avatarUploader = require('../../middlewares/avatarUpload');

//METHOD GET
router.get('/', getAllUser);

router.get('/:userId', getUserById);

//METHOD POST
router.post('/register', register);

router.post('/create', createUser);

//upload user images
router.post('/avatar/:userId', avatarUploader, uploadAvatar);

//METHOD PATCH
router.patch('/:userId', patchEditUser);

//METHOD DELETE
router.delete('/:userId', deleteUser);

module.exports = router;
