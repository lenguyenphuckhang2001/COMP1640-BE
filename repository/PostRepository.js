const Post = require('../database/models/Post');
const Tag = require('../database/models/Tag');

const findAllPosts = async (options) => {
  try {
    const posts = await Post.paginate({}, options);

    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findAllPostByTagId = async (tagId) => {
  try {
    const posts = await Post.find(
      {
        tags: {
          $in: [tagId],
        },
      },
      {
        title: 1,
        content: 1,
      },
    );

    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findAllUserPosts = async (options, userId) => {
  try {
    const posts = await Post.paginate({ author: userId }, options);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findAllAnonymousPosts = async () => {
  try {
    const posts = await Post.find(
      {
        isAnonymous: true,
      },
      null,
      {
        sort: {
          createdAt: -1,
        },
      },
    ).populate('tags author', {
      username: 1,
      email: 1,
      name: 1,
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findAllPostsWithoutComment = async () => {
  try {
    const posts = await Post.find({ comments: { $size: 0 } })
      .populate('tags author', {
        username: 1,
        email: 1,
        name: 1,
      })
      .populate({
        path: 'comments',
        select: {
          __v: 0,
        },
        populate: {
          path: 'author',
          select: {
            username: 1,
            email: 1,
          },
        },
      });

    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findAllPostsWithComment = async () => {
  try {
    const posts = await Post.find({ comments: { $exists: true, $ne: [] } });
    return posts;
  } catch (error) {
    console.log(error);
  }
};

const findPostById = async (id) => {
  const post = await Post.findById(id)
    .populate('tags author', {
      username: 1,
      email: 1,
      name: 1,
    })
    .populate({
      path: 'comments',
      select: {
        __v: 0,
      },
      populate: {
        path: 'author',
        select: {
          username: 1,
          email: 1,
        },
      },
    });

  return post;
};

const createPost = async (post) => {
  try {
    const data = await Post.create(post);
    const updateTagIsUsed = await Tag.updateMany(
      {
        _id: {
          $in: data.tags,
        },
      },
      {
        $set: {
          isUsed: true,
        },
      },
    );

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

// const addComment = async (id, data) => {
//   try {
//     const post = await Post.findByIdAndUpdate(
//       id,
//       {
//         $push: {
//           comments: data,
//         },
//       },
//       {
//         new: true,
//       },
//     )
//       .populate('tags author', {
//         name: 1,
//         username: 1,
//       })
//       .populate('comments.author', {
//         username: 1,
//       });
//     return post;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  findAllPosts,
  createPost,
  updatePost,
  findPostById,
  deletePost,
  findAllPostsWithoutComment,
  findAllPostsWithComment,
  findAllUserPosts,
  findAllPostByTagId,
  findAllAnonymousPosts,
};
