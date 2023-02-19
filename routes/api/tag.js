var express = require('express')
var router = express.Router()

const {
    createTag,
    getAllTags,
    updateTag,
    getTagById,
    deleteTag,
} = require('../../controllers/TagController')

//* get all tags
router.get('/', getAllTags)

//* get a tag by id
router.get('/:id', getTagById)

//* create a tag
router.post('/', createTag)

//* update a tag
router.patch('/:id', updateTag)

//* delete a tag
router.delete('/:id', deleteTag)

module.exports = router
