const PostService = require('../services/PostServices')

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostService.getAllPosts()
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await PostService.getPostById(id)
        if (post) {
            return res.status(200).json(post)
        }
        return res
            .status(404)
            .send('Post with the specified ID does not exists')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createPost = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({ error: 'Please provide a post' })

        const post = await PostService.createPost(req.body)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params
        const updatedPost = await PostService.updatePost(postId, req.body)
        return res.status(200).json({ post: updatedPost })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const deleted = await PostService.deletePost(postId)
        if (deleted) {
            return res.status(200).send('Post deleted')
        }
        throw new Error('Post not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const addComment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id)
            return res.status(400).json({ error: 'Please provide a post id' })
        if (!req.body)
            return res.status(400).json({ error: 'Please provide a comment' })

        const comment = await PostService.addComment(id, req.body)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addComment,
}
