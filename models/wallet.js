const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
 UserId: {type: String},
 
balance: {type:Number,default:0},

amount_Paid:{type:Number,default:0},

GST_applied:{type:Number,default:0},

PaymentType:{type:String,default:"Added"},

PaymentMode:{type:String,default:""},

PaymentStatus:{type:String,default:"Pending"}

}, 
 { timestamps: true});

module.exports = mongoose.model('wallet', walletSchema);