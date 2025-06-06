const mongoose = require('mongoose');

const missingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  colors: { type: [String], required: true },
  gender: { type: String, required: true },
  neutered: { type: String },
  features: { type: String },
  lostDate: { type: Date, required: true },
  lostLocation: { type: String, required: true },
  lostSituation: { type: String },
  images: { type: [String], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Missing', missingSchema);