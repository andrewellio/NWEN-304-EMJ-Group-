const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    usr: String,
    psw: String,
  });
  
  module.exports = mongoose.model("User", userSchema);