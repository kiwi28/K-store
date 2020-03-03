const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Username is required']
  },
  firstName: {
    type: String,
    required: [true, "First names is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  psw: {
    type: String,
    required: [true, "Password is required"]
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;