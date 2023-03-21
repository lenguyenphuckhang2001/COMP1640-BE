const mongoose = require('mongoose');
const { Role } = require('../../constants/role');

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
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phonenumber: {
      type: String,
      requied: true,
    },
    role: {
      type: String,
      enum: [Role.ADMIN_ROLE, Role.USER_ROLE, Role.QA_ROLE, Role.QA_COORDINATOR_ROLE],
      default: Role.USER_ROLE,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
