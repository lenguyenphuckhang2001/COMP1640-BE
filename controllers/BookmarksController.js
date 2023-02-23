const Bookmarks = require('../models/Bookmarks');

const createBookmark = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;
    const bookmark = await Bookmarks.create({ postId, userId });
    res.status(201).json(bookmark);
  } catch (error) {
    next(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Bookmarks.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBookmark,
  deleteBookmark,
};
