const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    productName:{type:String},
    price:{type:String},
    id:{type:String},
    Reviews:{type:String},
    
},
{
    timestamps: true
})


module.exports = mongoose.model("product", ProductSchema);