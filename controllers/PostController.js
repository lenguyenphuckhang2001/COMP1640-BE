const { default: mongoose } = require('mongoose');
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

    const QsA_EMAIL = process.env.QsA_EMAIL;
    const message = 'Have new Post';
    await sendEmail(QsA_EMAIL, message);

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

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid post id' });
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
};
