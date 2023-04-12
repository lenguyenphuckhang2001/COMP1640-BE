const { QA_COORDINATOR_ROLE, QA_ROLE, ADMIN_ROLE, USER_ROLE } = require('../constants/role');
const UserModel = require('../database/models/User');

const findAllUsers = async () => {
  const users = await UserModel.find(
    {
      role: ['user', QA_COORDINATOR_ROLE, QA_ROLE],
    },
    null,
    {
      sort: {
        createdAt: -1,
      },
    },
  );
  return users;
};

const findAllNormalUsers = async () => {
  const users = await UserModel.find(
    {
      role: USER_ROLE,
    },
    {
      password: 0,
      verified: 0,
      createdAt: 0,
      updatedAt: 0,
      avatar: 0,
      role: 0,
    },
    {
      sort: {
        createdAt: -1,
      },
    },
  );
  return users;
};

const findAllQacordinaUsers = async () => {
  const users = await UserModel.find(
    {
      role: QA_COORDINATOR_ROLE,
    },
    {
      password: 0,
      verified: 0,
      createdAt: 0,
      updatedAt: 0,
      avatar: 0,
      role: 0,
    },
    {
      sort: {
        createdAt: -1,
      },
    },
  );
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
    const users = await UserModel.create(user);
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  findAllNormalUsers,
  findAllQacordinaUsers,
};
