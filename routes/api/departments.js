var express = require('express');
var router = express.Router();

const {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
  getDepartmentById,
  addMember,
  getMembers,
  getMemberById,
  deleteMember,
} = require('../../controllers/DepartmentController');

//Method GET
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);

router.get('/members/:id', getMembers);
router.get('/members/:id/:memberId', getMemberById);

//Method POST
router.post('/', createDepartment);
router.post('/members/:id', addMember);

//Method PATCH
router.patch('/:id', updateDepartment);

//Method DELETE
router.delete('/:id', deleteDepartment);
router.delete('/members/:id/:memberId', deleteMember);

module.exports = router;
