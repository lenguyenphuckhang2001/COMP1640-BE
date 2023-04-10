const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      uppercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    votes: {
      type: Number,
      default: 0,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);
