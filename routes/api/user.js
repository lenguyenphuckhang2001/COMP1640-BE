var express = require('express');
var router = express.Router();

const {
  createUser,
  register,
  getUser,
  patchEditUser,
  deleteUser,
  getAllUser,
  uploadAvatar,
} = require('../../controllers/UserController');

//METHOD GET
router.get('/', getAllUser);

router.get('/:userId', getUser);

//METHOD POST
router.post('/register', register);

router.post('/create', createUser);

router.post('/:userId/avatar', uploadAvatar);

//METHOD PATCH
router.patch('/:userId', patchEditUser);

//METHOD DELETE
router.delete('/:userId', deleteUser);

module.exports = router;
