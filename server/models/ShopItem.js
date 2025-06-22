const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  isFeatured: Boolean,
  isExternal: Boolean,
  externalUrl: String,
});

module.exports = mongoose.model('Product', productSchema);