const TagModel = require('../database/models/Tag');

//check if tag is already used in a post or not. If it is used, then return error message and cannot be deleted.

const isTagUsed = async (req, res, next) => {
  try {
    const tagId = req.params.id;
    const isTagUsed = await TagModel.findOne({ _id: tagId, isUsed: true });

    if (isTagUsed) {
      return res.status(400).json({
        error: {
          message: 'Tag is already used!',
        },
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

module.exports = isTagUsed;
