const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   // ✅ use `required` instead of `require`
    videoId: { type: String, required: true }  // ✅ typo fixed
  },
  { timestamps: true }  // ✅ this goes outside the first object
);

module.exports = mongoose.model('Video', videoSchema);
