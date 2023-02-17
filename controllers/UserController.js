const UserServices = require('../services/UserServices')

const register = (req, res) => {
    res.json({
        message: 'Welcome to the API',
    })
}

const createUser = (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400)
        const user = req.body
        const result = UserServices.createUser(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    createUser,
}
