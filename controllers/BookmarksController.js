const Bookmarks = require('../database/models/Bookmarks');

const createBookmark = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;
    const bookmark = await Bookmarks.create({ postId, userId });
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Bookmarks.findByIdAndDelete(id);
    res.status(200).json('Bookmark delete successfully');
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createBookmark,
  deleteBookmark,
};
