const express = require('express');
const router = express.Router();
const { createBookmark, deleteBookmark } = require('../controllers/BookmarksController');

//METHOD POST
router.post('/bookmarks', createBookmark);

//METHOD DELETE
router.delete('/:bookmarkId', deleteBookmark);

module.exports = router;
