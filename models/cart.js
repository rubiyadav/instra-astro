
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

    User_id:{type:String},
    Products:{type:mongoose.Schema.Types.Array,
        ref:'Product'},
    
},
{
    timestamps: true
})


module.exports = mongoose.model("cart", CartSchema)

// const { model, Schema } = require("mongoose");
// const cartSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, 
//       ref: "User",
//        required: true 
//      },
//     cartItems: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: { type: Number, default: 1 },
//         price: { type: Number, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// );
// module.exports = model("cart", cartSchema);
