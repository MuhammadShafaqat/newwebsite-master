const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: [{
    type: String,
    required: true,
  }],
  images: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Action', ActionSchema);
