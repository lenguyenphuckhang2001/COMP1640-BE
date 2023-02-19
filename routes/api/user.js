var express = require('express')
var router = express.Router()

const { 
    createUser, 
    register, 
    login,
    getAllUsers } = require('../../controllers/UserController')

//Get all users
router.get('/',getAllUsers)

router.post('/register', register)

router.post('/login', login)

module.exports = router
