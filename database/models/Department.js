const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: false,
    },

    //TODO QA Cordinator
    QACordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Department', departmentSchema);
