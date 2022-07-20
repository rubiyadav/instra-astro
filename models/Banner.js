// const mongoose = require("mongoose");

// const BannerSchema = new mongoose.Schema({
//   imgUrl: { type: String },
//   id:{type:String},
//   time:{type:String}
// }, { timestamps: true });

// module.exports = mongoose.model("banner", BannerSchema);

const { model, Schema } = require("mongoose");
const bannerSchema = new Schema(
  {
    bannerImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("banner", bannerSchema);
