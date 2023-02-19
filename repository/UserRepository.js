const UserModel = require('../database/models/User')

const findAllUsers = async () => {
    const users = await UserModel.find({})

    console.log(users)
    return users
}

const createUser = async (user) => {
    try {
        const book = await UserModel.create(user)
        return book
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    findAllUsers,
    createUser,
}
