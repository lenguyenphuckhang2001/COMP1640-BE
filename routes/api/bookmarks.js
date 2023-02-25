const express = require('express');
const router = express.Router();
const { createBookmark, deleteBookmark } = require('../../controllers/BookmarksController');

//METHOD POST
router.post('/', createBookmark);

//METHOD DELETE
router.delete('/:id', deleteBookmark);

module.exports = router;
