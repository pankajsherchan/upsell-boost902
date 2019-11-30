const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  confNum: { type: String, required: true },
  RTC: { type: String, required: true },
  upgradedTo: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  numNights: { type: Number, required: true },
  revenue: { type: Number, required: true },
  commission: { type: Number, required: true },
  colleague: { type: String, required: true },
  remark: { type: String, required: false }
});

module.exports = mongoose.model('Post', postSchema);
