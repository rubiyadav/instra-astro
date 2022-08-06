const mongoose = require('mongoose');

const ReferCodeSchema = new mongoose.Schema({
  UserId: { type: String, default: "" },
  PersonReferCode: { type: String, default: "" },
  ParentBonus: { type: Number, default: 0 },
  UserBonus: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('ReferCode', ReferCodeSchema);