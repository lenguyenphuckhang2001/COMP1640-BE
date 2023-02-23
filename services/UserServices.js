const UserRepository = require('../repository/UserRepository');

const getAllUsers = async () => {
  try {
    const users = await UserRepository.findAllUsers();
    return users;
  } catch (error) {}
};

const createUser = async (user) => {
  try {
    const newUser = await UserRepository.createUser(user);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await UserRepository.findUserById(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
