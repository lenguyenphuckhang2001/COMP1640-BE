const Post = require('../database/models/Post');

const findAllPosts = async (options) => {
  // const posts = await Post.find(
  //     {},
  //     {
  //         __v: 0,
  //     }
  // )
  //     .populate('tags author', {
  //         name: 1,
  //         username: 1,
  //     })
  //     .populate('comments.author', {
  //         username: 1,
  //     })
  //     .sort({ createdAt: -1 })

  try {
    const posts = await Post.paginate({}, options);

    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findPostById = async (id) => {
  const post = await Post.findById(id, {
    __v: 0,
  })
    .populate('tags author', {
      name: 1,
      username: 1,
    })
    .populate('comments.author', {
      username: 1,
      email: 1,
    });
  return post;
};

const createPost = async (post) => {
  try {
    const data = await Post.create(post);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (id, post) => {
  try {
    const data = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (id, data) => {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: data,
        },
      },
      {
        new: true,
      },
    )
      .populate('tags author', {
        name: 1,
        username: 1,
      })
      .populate('comments.author', {
        username: 1,
      });
    return post;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findAllPosts,
  createPost,
  updatePost,
  findPostById,
  deletePost,
  addComment,
};
