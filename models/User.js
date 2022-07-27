const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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
  profile: {
    type: String,
    required: false
  },
  Name: {
    type: String,
    required: false
  },
  roles: {
    type: String,
    default: 'customer'
  }


});
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password)
  }
};

module.exports = mongoose.model('User', userSchema);

