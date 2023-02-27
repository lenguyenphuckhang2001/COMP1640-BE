const CommentModel = require('../database/models/Comment');
const PostModel = require('../database/models/Post');

const createComment = async (comment, id) => {
  try {
    const data = await CommentModel.create(comment);
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: String(data._id),
        },
      },
      {
        new: true,
      },
    );
    console.log(post);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findCommentById = async (id) => {
  try {
    const comment = await CommentModel.findById(id).populate('comments', {
      username: 1,
    });
    console.log(comment);
    return comment;
  } catch (error) {
    console.log(error);
  }
};

const getAllComment = async (options) => {
  try {
    const comments = await CommentModel.find({}).populate('author', {
      username: 1,
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
};

const getAllCommentByPostId = async (id) => {
  try {
    const comments = await PostModel.findById(id, {
      comments: 1,
    }).populate({
      path: 'comments',
      select: {
        content: 1,
        author: 1,
      },
      populate: {
        path: 'author',
        select: {
          username: 1,
        },
      },
    });
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (id, comment) => {
  try {
    const data = await CommentModel.findByIdAndUpdate(id, comment, {
      new: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (id) => {
  try {
    const data = await CommentModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  findCommentById,
  getAllCommentByPostId,
};
