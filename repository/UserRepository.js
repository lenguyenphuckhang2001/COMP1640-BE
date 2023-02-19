const UserModel = require('../database/models/User')

const findAllUsers = async () => {
    const users = await UserModel.find({})

    console.log(users)
    return users
}

const createUser = async (user) => {
    try {
        const users = await UserModel.create(user)
        return users
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    findAllUsers,
    createUser,
}
