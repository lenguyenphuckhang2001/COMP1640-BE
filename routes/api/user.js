var express = require('express');
var router = express.Router();

const {
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
} = require('../../controllers/UserController');

const { avatarUploader } = require('../../middlewares/Uploader');

//METHOD GET
router.get('/', getAllUser);

router.get('/:userId', getUserById);

//upload user images
router.post('/avatar/:userId', avatarUploader, uploadAvatar);

//METHOD PATCH
router.patch('/:userId', patchEditUser);

//METHOD DELETE
router.delete('/:userId', deleteUser);

module.exports = router;
