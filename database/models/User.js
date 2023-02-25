const mongoose = require('mongoose');
const { Role } = require('../../constants/role');
const { Department } = require('../../constants/department');

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: false,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    DoB: {
      type: Date,
      requied: true,
    },
    phonenumber: {
      type: String,
      requied: true,
    },
    role: {
      type: String,
      enum: [Role.ADMIN_ROLE, Role.USER_ROLE, Role.QA_ROLE],
      default: Role.USER_ROLE,
    },
    department: {
      type: String,
      enum: [
        Department.IT_DEPARTMENT,
        Department.ADMISSIONS_DEPARTMENT,
        Department.TRAINNING_DEPARTMENT,
      ],
      default: Department.IT_DEPARTMENT,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
