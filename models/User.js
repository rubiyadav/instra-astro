const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: false,
  },
  mobile_Number: {
    type: String,
    required: true,

  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false
  },
  Name: {
    type: String,
    required: false
  },
  roles: {
    type: String,
    default:'customer'}


});

module.exports = mongoose.model('User', userSchema);

