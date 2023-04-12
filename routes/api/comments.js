var express = require('express');

var router = express.Router();
const {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
  getCommentById,
  getAllCommentByPostId,
  getAllAnonymousComment,
} = require('../../controllers/CommentController');

const { isFinalCloseDate } = require('../../middlewares/isCloseDate');

router.get('/', getAllComment);
router.get('/anonymous', getAllAnonymousComment);
router.get('/post/:postId', getAllCommentByPostId);
router.get('/:id', getCommentById);
router.post('/post/:id', isFinalCloseDate, createComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
