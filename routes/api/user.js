var express = require('express');
var router = express.Router();

const {
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUsers,
  uploadAvatar,
} = require('../../controllers/UserController');

const { avatarUploader } = require('../../middlewares/Uploader');
const { adminRole } = require('../../permission/author');

//METHOD GET
router.get('/', adminRole, getAllUsers);

router.get('/:userId', getUserById);

//upload user images
router.post('/avatar/:userId', avatarUploader, uploadAvatar);

//METHOD PATCH
router.patch('/:userId', adminRole, patchEditUser);

//METHOD DELETE
router.delete('/:userId', adminRole, deleteUser);

module.exports = router;
