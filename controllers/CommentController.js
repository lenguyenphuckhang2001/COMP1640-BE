const { default: mongoose } = require('mongoose');
const CommentService = require('../services/CommentServices');

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const data = await CommentService.createComment(req.body, postId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await CommentService.getAllComment(req.query);
    res.status(200).json(comments);
    console.log(req.query);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) return res.status(400).json({ message: 'Post id is required' });
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(400).json({ message: 'Post id is invalid' });
    const comments = await CommentService.getAllCommentByPostId(postId);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await CommentService.getCommentById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateComment = async (req, res) => {
  try {
    const data = await CommentRepository.updateComment(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const data = await CommentRepository.deleteComment(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  getCommentById,
  getAllCommentByPostId,
};
