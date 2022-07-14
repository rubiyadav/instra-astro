
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

    User_id:{type:String},
    id:{type:String},
    Products:{type:mongoose.Schema.Types.Array,
        ref:'Product'},
    
},
{
    timestamps: true
})


module.exports = mongoose.model("cart", CartSchema)

