import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
