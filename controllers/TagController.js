const TagServices = require('../services/TagServices');

const getAllTags = async (req, res, next) => {
  try {
    const tags = await TagServices.getAllTags({});
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTagById = async (req, res, next) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'No id' });
    const tag = await TagServices.getTagById(req.params.id);
    if (!tag) return res.status(400).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTag = async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).json({ message: 'No data' });
    const tag = await TagServices.createTag(req.body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTag = async (req, res, next) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'No id' });
    if (!req.body) return res.status(400).json({ message: 'No data' });
    const tag = await TagServices.updateTag(req.params.id, req.body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTag = async (req, res, next) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'No id' });
    const tag = await TagServices.deleteTag(req.params.id);
    if (!tag) return res.status(400).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTags,
  createTag,
  updateTag,
  getTagById,
  deleteTag,
};
