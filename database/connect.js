require('dotenv').config();
const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(
      `Connect to Database OK, listening on http://localhost:${process.env.PORT || 3001}`,
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
};
