var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
    })
})

router.post('/register', (req, res) => {
    res.json({
        message: 'Register',
    })
})

router.post('/login', (req, res) => {
    res.json({
        message: 'Login',
    })
})

router.patch('/:id', (req, res) => {
    res.json({
        message: 'Update',
    })
})

router.delete('/:id', (req, res) => {
    res.json({
        message: 'Delete',
    })
})

module.exports = router
