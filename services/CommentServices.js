const CommentRepository = require('../repository/CommentRepository');

const createComment = async (comment, id) => {
  try {
    const data = await CommentRepository.createComment(comment, id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCommentById = async (id) => {
  try {
    const comment = await CommentRepository.findCommentById(id);
    return comment;
  } catch (error) {
    console.log(error);
  }
};

const getAllComment = async (options) => {
  try {
    const comments = await CommentRepository.getAllComment(options);
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const getAllCommentByPostId = (id) => {
  try {
    const comments = CommentRepository.getAllCommentByPostId(id);
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (id, comment) => {
  try {
    const data = await CommentRepository.updateComment(id, comment);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (id) => {
  try {
    const data = await CommentRepository.deleteComment(id);
  } catch (error) {
    console.log(error);
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
