const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  username: { type: String, required: true },
  address: { type: String, required: true },
  phoneno: { type: Number, required: true },
  birthday: { type: Date, required: true },
  store: { type: String, required: true },
  notes: { type: String, required: true },
}, {
  timestamps: true, 
});

const Data = mongoose.model('dataSchema', dataSchema);

module.exports = Data;