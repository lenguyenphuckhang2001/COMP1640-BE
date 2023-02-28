const { default: mongoose } = require('mongoose');
const CommentService = require('../services/CommentServices');

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const data = await CommentService.createComment(req.body, postId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await CommentService.getAllComment(req.query);
    res.status(200).json(comments);
    console.log(req.query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) return res.status(400).json({ message: 'Post id is required' });
    const comments = await CommentService.getAllCommentByPostId(postId);
    if (!comments) return res.status(404).json({ message: 'Comment not found' });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'Comment id is required' });
    const comment = await CommentService.getCommentById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'Comment id is required' });
    const data = await CommentService.updateComment(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'Comment id is required' });
    const data = await CommentService.deleteComment(req.params.id);
    if (!data) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
    console.log(data);
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
