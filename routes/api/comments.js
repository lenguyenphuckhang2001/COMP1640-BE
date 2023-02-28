var express = require('express');

var router = express.Router();
const {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
  getCommentById,
  getAllCommentByPostId,
} = require('../../controllers/CommentController');

router.get('/', getAllComment);
router.get('/post/:id', getAllCommentByPostId);
router.get('/:id', getCommentById);
router.post('/post/:id', createComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
