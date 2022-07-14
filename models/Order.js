const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({

    User_id:{type:String},
    Cart_id:{type:String},
    Default_address:{type:String},
    OrderStatus:{type:String},
    Default_payment_id:{type:String},
},
{
    timestamps: true
})

module.exports = mongoose.model("order", OrderSchema);