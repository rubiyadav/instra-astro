
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content:{type:String,default:""},
  from:{type:String,default:""},
    time: { type: String },
//   time:{type:String,default:""},
  date:{type:String,default:""},
  to:{type:String,default:""}
},{ timestamps: true})

const Message = mongoose.model('message', MessageSchema);

module.exports = Message