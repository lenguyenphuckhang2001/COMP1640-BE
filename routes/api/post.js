var express = require('express');
var router = express.Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
  addComment,
} = require('../../controllers/PostController');

const avartarUploader = require('../../middlewares/avatarUpload');

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', avartarUploader, createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

router.patch('/addComment/:id', addComment);

module.exports = router;
