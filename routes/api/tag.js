var express = require('express')
var router = express.Router()

const {
    createTag,
    getAllTags,
    updateTag,
    getTagById,
    deleteTag,
} = require('../../controllers/TagController')

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The title of your book
 *         description:
 *           type: string
 *           description: The book author
 *       example:
 *         name: Js
 *         description: Welcom to js
 *
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *        - Tags
 *     summary: Retrieve a list of books
 *     description: Retrieve a list of Books. Can be used to populate a list of fake books when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 0
 *                   name:
 *                     type: string
 *                     example: Leanne Graham
 *                   description:
 *                     type: string
 *                     example: Test
 */
//* get all tags
router.get('/', getAllTags)

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     tags:
 *        - Tags
 *     summary: Retrieve a  book
 *     description: Retrieve a  Books.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 0
 *                 name:
 *                   type: string
 *                   example: Js
 *                 description:
 *                   type: string
 *                   example: Test
 *
 */
//* get a tag by id
router.get('/:id', getTagById)

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: The books managing API
 * /tags:
 *   post:
 *     summary: Create a new book
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 */
//* create a tag
router.post('/', createTag)

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     tags:
 *        - Tags
 *     summary: Update book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the tag to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 name: string
 *                 example: js
 *               price:
 *                 type: string
 *                 example: test
 *     responses:
 *       201:
 *         description: Update books.
 */
//* update a tag
router.patch('/:id', updateTag)

/**
 * @swagger
 * /tags/{id}:
 *  delete:
 *      tags:
 *         - Tags
 *      summary: Delete tag
 *      description: Delete tag
 *      parameters:
 *        - in: path
 *          name: tagId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of Book to delete
 *      responses:
 *          200:
 *              description: Book that was deleted
 */

//* delete a tag
router.delete('/:id', deleteTag)

module.exports = router
