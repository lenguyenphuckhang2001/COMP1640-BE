const TagModel = require('../database/models/Tag');

const findAllTags = async () => {
  const tags = await TagModel.find({});
  return tags;
};

const findTagById = async (id) => {
  try {
    const tag = await TagModel.findById(id);
    return tag;
  } catch (error) {
    console.log(error);
  }
};

const createTag = async (tag) => {
  try {
    const tag = await TagModel.create(tag);
    return tag;
  } catch (error) {
    console.log(error);
  }
};

const updateTag = async (id, tag) => {
  try {
    const updateTag = await TagModel.findByIdAndUpdate(id, tag, {
      new: true,
    });
    return updateTag;
  } catch (error) {
    console.log(error);
  }
};

const deleteTag = async (id) => {
  try {
    const deleteTag = await TagModel.findByIdAndDelete(id);
    return deleteTag;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findAllTags,
  createTag,
  updateTag,
  findTagById,
  deleteTag,
};
