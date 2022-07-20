// const mongoose = require("mongoose");
// const OrderSchema = new mongoose.Schema({

//     User_id:{type:String},
//     Cart_id:{type:String},
//     Default_address:{type:String},
//     OrderStatus:{type:String},
//     Default_payment_id:{type:String},
// },
// {
//     timestamps: true
// })

// module.exports = mongoose.model("order", OrderSchema);


const { model, Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = model("order", orderSchema);
