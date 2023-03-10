const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema(
  {
    closeDate: {
      type: Date,
    },
    finalCloseDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    isFinal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Timer', TimerSchema);
