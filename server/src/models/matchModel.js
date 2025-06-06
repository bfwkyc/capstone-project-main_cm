const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  colors: { type: [String], required: true },
  features: { type: String, required: true },
});

module.exports = mongoose.model('Match', matchSchema);