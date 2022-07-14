const mongoose = require("mongoose");
const TrackingOrderSchema = new mongoose.Schema({

    Order_id:{type:String},
    order_Location:{type:String},
    OrderStatus:{type:String},
    order_PaymentMode:{type:String},
    order_PaymentStatus:{type:String},
    id:{type:String}
},
{
    timestamps: true
})

module.exports = mongoose.model("trackingorder",TrackingOrderSchema);

