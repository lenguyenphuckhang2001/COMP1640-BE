var express = require('express');
var router = express.Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
  getAllPostsWithoutComment,
  getAllPostsWithComment,
} = require('../../controllers/PostController');

const { fileUpload } = require('../../middlewares/Uploader');

const { isCloseDate } = require('../../middlewares/isCloseDate');
const { userRole } = require('../../permission/author');

router.get('/', getAllPosts);

router.get('/no-comment', getAllPostsWithoutComment);

router.get('/with-comments', getAllPostsWithComment);

router.get('/:id', getPostById);

router.post('/', [fileUpload, isCloseDate], createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

// router.patch('/addComment/:id', addComment);

module.exports = router;
