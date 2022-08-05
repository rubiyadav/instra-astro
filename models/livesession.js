const mongoose = require('mongoose');

const LiveSessionSchema = new mongoose.Schema({
  UserId:{type:String,default:""},
  SessionLink:{type:String,default:""},
  SessionTime:{type:String},
  SessionStatus:{type:String,default:"Upcomming"},
  SessionActiveUsers:{type:[String]}
},{ timestamps: true})

module.exports = mongoose.model('LiveSession', LiveSessionSchema);

