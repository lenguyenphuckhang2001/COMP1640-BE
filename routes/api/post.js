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
  getAllUserPosts,
  getAllPostByTagId,
  getAllAnonymousPosts,
} = require('../../controllers/PostController');

const { fileUpload } = require('../../middlewares/Uploader');

const { isCloseDate } = require('../../middlewares/isCloseDate');

router.get('/', getAllPosts);

router.get('/anonymous', getAllAnonymousPosts);

router.get('/user/:userId', getAllUserPosts);

router.get('/no-comment', getAllPostsWithoutComment);

router.get('/with-comments', getAllPostsWithComment);

router.get('/tag/:tagId', getAllPostByTagId);

router.get('/:id', getPostById);

router.post('/', [fileUpload, isCloseDate], createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

// router.patch('/addComment/:id', addComment);

module.exports = router;
