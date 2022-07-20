const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    User_id:{type:String},
    CardName:{type:String},
    CardNo:{type:String},
    ExpiryDate:{type:String},
    Cvv:{type:String},
},
{
    timestamps: true
})


module.exports = mongoose.model("payment",PaymentSchema);

