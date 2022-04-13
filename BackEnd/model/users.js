const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    // required: true,
    // minLength: [8, "Must be at least 8 characters"],
  },
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  mobile: { type: Number },
  countryCode: { type: String },
  passportNumber: { type: String },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
