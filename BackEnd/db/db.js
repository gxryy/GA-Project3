const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;