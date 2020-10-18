const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    usr: String,
    psw: String,
  });

  userSchema.plugin(passportLocalMongoose);
  
  module.exports = mongoose.model("User", userSchema);