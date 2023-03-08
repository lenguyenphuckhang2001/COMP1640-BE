const PostRepository = require('../repository/PostRepository');

const getAllPosts = (options) => {
  try {
    const posts = PostRepository.findAllPosts(options);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

const getPostById = (id) => {
  try {
    const post = PostRepository.findPostById(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

const createPost = (post) => {
  try {
    const newPost = PostRepository.createPost(post);
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = (id, post) => {
  try {
    const updatePost = PostRepository.updatePost(id, post);
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = (id) => {
  try {
    const deletePost = PostRepository.deletePost(id);
    return deletePost;
  } catch (error) {
    console.log(error);
  }
};

// const addComment = (id, data) => {
//     try {
//         const post = PostRepository.addComment(id, data)
//         return post
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
