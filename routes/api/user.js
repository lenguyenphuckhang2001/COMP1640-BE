var express = require('express')
var router = express.Router()

const { createUser, register } = require('../../controllers/UserController')

//Get all users
router.get('/')

router.post('/register', register)

router.post('/login', createUser)

module.exports = router
