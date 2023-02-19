const UserModel = require('../database/models/User');

const findAllUsers = async () => {
  const users = await UserModel.find({});
  console.log(users);
  return users;
};

const findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

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
  findUserById,
};
