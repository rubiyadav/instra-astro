
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content:{type:String,default:""},
  from:{type:String,default:""},
    time: { type: String },
  to:{type:String,default:""}
},{ timestamps: true})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message