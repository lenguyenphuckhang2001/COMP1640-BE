const CommentModel = require('../database/models/Comment');
const PostModel = require('../database/models/Post');

const createComment = async (comment, id) => {
  try {
    const data = await (
      await CommentModel.create(comment)
    ).populate('author', {
      username: 1,
      email: 1,
    });

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
    const comment = await CommentModel.findById(id).populate('author', {
      username: 1,
    });
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

const getAllAnonymousComment = async () => {
  try {
    const comments = await CommentModel.find({}).populate('author', {
      username: 1,
    });
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const getAllCommentByPostId = async (id, options) => {
  try {
    const comments = await PostModel.paginate(
      {
        _id: id,
      },
      options,
    );
    console.log('🚀 ~ file: CommentRepository.js:62 ~ getAllCommentByPostId ~ comments:', comments);
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
    const post = await PostModel.updateMany(
      {},
      {
        $pull: {
          comments: id,
        },
      },
      {
        new: true,
      },
    );
    return data;
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
  getAllAnonymousComment,
};
