const express = require('express');
const router = express.Router();
const { createBookmark, deleteBookmark } = require('../../controllers/BookmarksController');
const { userRole } = require('../../permission/author');

//METHOD POST
router.post('/', userRole, createBookmark);

//METHOD DELETE
router.delete('/:id', userRole, deleteBookmark);

module.exports = router;
