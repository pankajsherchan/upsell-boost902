const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postInfoSchema = new Schema({
  arrival: { type: Number, required: true },
  target: { type: Number, required: true },
  achieve: { type: Number, required: true },
  month: { type: String, required: false },
  date: { type: Date, required: true },
  totalRoom: { type: Number, required: true },
  totalSoldRoom: { type: Number, required: true }
});

module.exports = mongoose.model('PostInfo', postInfoSchema);
