const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  _id: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Url', urlSchema);
