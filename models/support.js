
const { model, Schema } = require("mongoose");
const SupportSchema = new Schema(
  {
    Phone: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    WhatApp: {
      type: String,
      required: true,
    },
      zipcode: {
       type: Number,
       required:true
   }
  },
  { timestamps: true }
  
);
module.exports = model("CustomerSupport", SupportSchema);
