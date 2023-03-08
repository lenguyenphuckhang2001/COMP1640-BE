const TimerModel = require('../database/models/Timer');

const isCloseDate = async (req, res, next) => {
  try {
    const closeDate = await TimerModel.findOne({ isClosed: false }).sort({ createdAt: -1 });
    console.log('🚀 ~ file: isCloseDate.js:6 ~ isCloseDate ~ closeDate:', closeDate);
    const currentDate = new Date();

    if (closeDate?.startDate <= currentDate) {
      return next();
    }

    if (closeDate?.closeDate < currentDate) {
      return res.status(400).json({ error: 'Close date is active' });
    }
  } catch (error) {
    console.log(error);
  }
};

const isFinalCloseDate = async (req, res, next) => {
  try {
    const closeDate = await TimerModel.findOne({ isFinal: false }).sort({ createdAt: -1 });
    const currentDate = new Date();

    if (closeDate?.startDate <= currentDate || closeDate?.finalCloseDate > currentDate) {
      return next();
    }

    if (closeDate?.finalCloseDate < currentDate) {
      return res.status(400).json({ error: "Final close date is active so can't create Comment" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  isCloseDate,
  isFinalCloseDate,
};
