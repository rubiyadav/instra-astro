const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  imgUrl: { type: String },
  id:{type:String},
  time:{type:String}
}, { timestamps: true });

module.exports = mongoose.model("banner", BannerSchema);