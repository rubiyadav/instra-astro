// const mongoose = require('mongoose');

// const MessageSchema = new mongoose.Schema({
//   content:{type: String},
//   from: {type:String},
//   time: {type:String},
//   date: {type:String},
//   to: {type:String}
  
// },{ timestamps: true})

// const Message = mongoose.model('Message', MessageSchema);

// module.exports = Message
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content:{type:String,default:""},
  from:{type:String,default:""},
  time:{type:String,default:""},
  date:{type:String,default:""},
  to:{type:String,default:""}
},{ timestamps: true})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message