const mongoose = require('mongoose');
const Role = require('../../constants/role');

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: false,
      unique: false,
      default: '',
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
      enum: [Role.USER_ROLE, Role.ADMIN_ROLE, , Role.QA_ROLE, Role.QA_COORDINATOR_ROLE],
      default: Role.USER_ROLE,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('User', userSchema);
