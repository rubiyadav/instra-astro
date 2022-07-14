const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({

    Street:{type:String},
    Area:{type:String},
    City:{type:String},
    State:{type:String},
    Country:{type:String},
    User_ID:{type:String}
},
{
    timestamps: true
})


module.exports = mongoose.model("address", AddressSchema);
