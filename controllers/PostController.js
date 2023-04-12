const { default: mongoose } = require('mongoose');
const Role = require('../constants/role');
const User = require('../database/models/User');
const PostService = require('../services/PostServices');
const { sendEmail } = require('../utils/sendEmail');
const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const options = {
      page,
      limit: parseInt(limit),
      populate: [
        {
          path: 'tags',
          select: 'name',
        },
        {
          path: 'author',
          select: 'username',
        },
        // {
        //   path: 'comments',
        //   select: 'content author createdAt',
        //   //   populate: {
        //   //     path: 'author',
        //   //     select: 'username',
        //   //   },
        // },
      ],
      sort: { createdAt: -1 },
    };

    const posts = await PostService.getAllPosts(options);
    if (!posts) return res.status(400).json({ error: 'Posts not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPostByTagId = async (req, res) => {
  try {
    const { tagId } = req.params;
    if (!tagId) return res.status(400).json({ error: 'Tag id is required' });
    const posts = await PostService.getAllPostByTagId(tagId);
    if (!posts) return res.status(400).json({ error: 'Posts not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 5 } = req.query;
    const options = {
      page,
      limit: parseInt(limit),
      populate: [
        {
          path: 'tags',
          select: 'name',
        },
      ],
      sort: { createdAt: -1 },
    };

    const posts = await PostService.getAllUserPosts(options, userId);
    if (!posts) return res.status(400).json({ error: 'Posts not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllAnonymousPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllAnonymousPosts();
    if (!posts) return res.status(400).json({ error: 'Posts not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPostsWithoutComment = async (req, res) => {
  try {
    const posts = await PostService.getAllPostsWithoutComment();
    if (!posts) return res.status(400).json({ error: 'Posts no comment not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPostsWithComment = async (req, res) => {
  try {
    const posts = await PostService.getAllPostsWithComment();
    if (!posts) return res.status(400).json({ error: 'Posts with comment not found' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createPost = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: 'Please provide a post' });
    let data = req.body;
    if (req.file) {
      data = {
        ...req.body,
        file: req.file.path.slice(7),
      };
    }
    const post = await PostService.createPost(data);

    const message = 'A new post has been created. Please check it out';
    const users = await User.find({ role: Role.QA_COORDINATOR_ROLE });
    const emails = users.map((user) => user.email);
    await sendEmail(emails, message);

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a post id' });
    if (!req.body) return res.status(400).json({ error: 'Please provide a post' });

    const updatedPost = await PostService.updatePost(id, req.body);

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a post id' });
    const deleted = await PostService.deletePost(id);
    if (deleted) return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// const addComment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ error: 'Please provide a post id' });
//     if (!req.body) return res.status(400).json({ error: 'Please provide a comment' });

//     const comment = await PostService.addComment(id, req.body);
//     return res.status(200).json(comment);
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsWithoutComment,
  getAllPostsWithComment,
  getAllUserPosts,
  getAllPostByTagId,
  getAllAnonymousPosts,
};
